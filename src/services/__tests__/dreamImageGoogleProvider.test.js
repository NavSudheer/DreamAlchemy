/* global jest, describe, beforeEach, afterAll, it, expect */
import { Buffer } from 'node:buffer';

const makeModule = () => require('../../../api/dream-image-google');

const makeOidcToken = (claims = {}) => {
  const payload = Buffer.from(JSON.stringify({
    iss: process.env.GOOGLE_VERTEX_OIDC_ISSUER,
    aud: process.env.GOOGLE_VERTEX_OIDC_AUDIENCE,
    sub: process.env.GOOGLE_VERTEX_OIDC_SUBJECT,
    ...claims,
  })).toString('base64url');
  return `header.${payload}.signature`;
};

const makeRequest = token => ({
  headers: { get: name => (name === 'x-vercel-oidc-token' ? token : null) },
});

describe('Google Vertex Gemini image provider adapter', () => {
  const originalEnvironment = process.env;

  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
    process.env = { ...originalEnvironment };
    process.env.GOOGLE_VERTEX_PROJECT_ID = 'dream-image-test-project';
    process.env.GOOGLE_VERTEX_PROJECT_NUMBER = '123456789012';
    process.env.GOOGLE_VERTEX_LOCATION = 'us-central1';
    process.env.GOOGLE_VERTEX_SERVICE_ACCOUNT_EMAIL = 'dream-image@example.iam.gserviceaccount.com';
    process.env.GOOGLE_VERTEX_WORKLOAD_IDENTITY_POOL_ID = 'vercel-dreamalchemy-preview';
    process.env.GOOGLE_VERTEX_WORKLOAD_IDENTITY_PROVIDER_ID = 'vercel-dreamalchemy-preview';
    process.env.GOOGLE_VERTEX_OIDC_ISSUER = 'https://oidc.vercel.com/example-team';
    process.env.GOOGLE_VERTEX_OIDC_AUDIENCE = 'https://vercel.com/example-team';
    process.env.GOOGLE_VERTEX_OIDC_SUBJECT = 'owner:example-team:project:dreamalchemy-preview:environment:preview';
    process.env.GOOGLE_VERTEX_IMAGE_MODEL = 'imagen-4.0-fast-generate-001';
  });

  afterAll(() => {
    process.env = originalEnvironment;
  });

  it('exchanges a Vercel OIDC token, impersonates the service account, and requests one safe Gemini image output', async () => {
    const fetchMock = jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ ok: true, json: async () => ({ access_token: 'federated-access-token' }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ accessToken: 'test-access-token', expireTime: '2030-01-01T00:00:00Z' }) })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          candidates: [{ content: { parts: [
            { text: 'A quiet lake.' },
            { inlineData: { mimeType: 'image/png', data: 'aGVsbG8=' } },
          ] } }],
        }),
      });
    const token = makeOidcToken();
    const { generateGoogleDreamImage } = makeModule();

    await expect(generateGoogleDreamImage('A curated moonlit lake.', 'watercolor', makeRequest(token)))
      .resolves.toEqual({ imageUrl: 'data:image/png;base64,aGVsbG8=' });

    const [federationCall, impersonationCall, imageCall] = fetchMock.mock.calls;
    expect(federationCall[0]).toBe('https://sts.googleapis.com/v1/token');
    const federationBody = new URLSearchParams(federationCall[1].body);
    expect(federationBody.get('grant_type')).toBe('urn:ietf:params:oauth:grant-type:token-exchange');
    expect(federationBody.get('audience')).toBe('//iam.googleapis.com/projects/123456789012/locations/global/workloadIdentityPools/vercel-dreamalchemy-preview/providers/vercel-dreamalchemy-preview');
    expect(federationBody.get('subject_token')).toBe(token);
    expect(federationBody.get('scope')).toBe('https://www.googleapis.com/auth/cloud-platform');
    expect(impersonationCall[0]).toBe('https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/dream-image%40example.iam.gserviceaccount.com:generateAccessToken');
    expect(impersonationCall[1].headers.Authorization).toBe('Bearer federated-access-token');
    expect(JSON.parse(impersonationCall[1].body)).toEqual({
      scope: ['https://www.googleapis.com/auth/cloud-platform'],
      lifetime: '3600s',
    });
    expect(imageCall[0]).toBe('https://us-central1-aiplatform.googleapis.com/v1/projects/dream-image-test-project/locations/us-central1/publishers/google/models/gemini-2.5-flash-image:generateContent');
    expect(imageCall[1].headers.Authorization).toBe('Bearer test-access-token');
    expect(JSON.parse(imageCall[1].body)).toEqual({
      contents: [{
        role: 'user',
        parts: [{ text: 'A curated moonlit lake. Render as watercolor artwork with fluid pigment washes, organic edges, and textured paper.' }],
      }],
      generationConfig: {
        responseModalities: ['TEXT', 'IMAGE'],
        candidateCount: 1,
        imageConfig: { aspectRatio: '1:1' },
      },
    });
  });

  it('rejects a token from the wrong project or environment before network access', async () => {
    const fetchMock = jest.spyOn(global, 'fetch');
    const { generateGoogleDreamImage } = makeModule();

    await expect(generateGoogleDreamImage(
      'A curated moonlit lake.',
      'ethereal',
      makeRequest(makeOidcToken({ sub: 'owner:example-team:project:dreamalchemy-preview:environment:production' })),
    )).rejects.toThrow('Google Vertex Vercel OIDC token claims do not match this Preview project.');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects a missing Vercel OIDC token without making a network request', async () => {
    const fetchMock = jest.spyOn(global, 'fetch');
    const { generateGoogleDreamImage } = makeModule();

    await expect(generateGoogleDreamImage('A curated moonlit lake.', 'ethereal', makeRequest(null)))
      .rejects.toThrow('Google Vertex Vercel OIDC token is unavailable.');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects an incomplete federation configuration without making a network request', async () => {
    delete process.env.GOOGLE_VERTEX_WORKLOAD_IDENTITY_POOL_ID;
    const fetchMock = jest.spyOn(global, 'fetch');
    const { generateGoogleDreamImage } = makeModule();

    await expect(generateGoogleDreamImage('A curated moonlit lake.', 'ethereal', makeRequest(makeOidcToken())))
      .rejects.toThrow('Google Vertex Workload Identity Federation settings are incomplete.');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('maps Gemini safety-filtered responses to a stable moderation code', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ ok: true, json: async () => ({ access_token: 'federated-access-token' }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ accessToken: 'test-access-token', expireTime: '2030-01-01T00:00:00Z' }) })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ promptFeedback: { blockReason: 'SAFETY' } }),
      });

    const { generateGoogleDreamImage } = makeModule();
    await expect(generateGoogleDreamImage('A curated moonlit lake.', 'ethereal', makeRequest(makeOidcToken())))
      .rejects.toMatchObject({ code: 'moderation_rejected' });
  });

  it('rejects malformed or oversized upstream image payloads', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({ ok: true, json: async () => ({ access_token: 'federated-access-token' }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ accessToken: 'test-access-token', expireTime: '2030-01-01T00:00:00Z' }) })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          candidates: [{ content: { parts: [{ inlineData: { mimeType: 'image/svg+xml', data: 'PHN2Zz4=' } }] } }],
        }),
      });

    const { generateGoogleDreamImage } = makeModule();
    await expect(generateGoogleDreamImage('A curated moonlit lake.', 'ethereal', makeRequest(makeOidcToken())))
      .rejects.toThrow('Google Vertex returned an invalid or oversized image.');
  });
});
