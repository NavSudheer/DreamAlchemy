/* global describe, it, expect, jest */

const {
  default: handler,
  ANALYZE_DREAM_MAX_REQUEST_BYTES,
  ANALYZE_DREAM_MAX_TEXT_CHARACTERS,
} = require('../../../api/analyze-dream');

const request = (body, overrides = {}) => ({
  method: 'POST',
  headers: { get: () => null },
  json: jest.fn().mockResolvedValue(body),
  ...overrides,
});

describe('Dream analysis route privacy and request boundary', () => {
  it('accepts preflight without reading a body', async () => {
    const response = await handler(request(undefined, { method: 'OPTIONS' }));
    expect(response.status).toBe(204);
  });

  it('requires JSON and rejects declared oversized bodies', async () => {
    const wrongType = await handler(request({ dreamText: 'A safe fixture dream.' }, {
      headers: { get: name => name === 'content-type' ? 'text/plain' : null },
    }));
    expect(wrongType.status).toBe(415);
    await expect(wrongType.json()).resolves.toMatchObject({ code: 'invalid_content_type' });

    const oversized = await handler(request({ dreamText: 'A safe fixture dream.' }, {
      headers: { get: name => name === 'content-length' ? String(ANALYZE_DREAM_MAX_REQUEST_BYTES + 1) : null },
    }));
    expect(oversized.status).toBe(413);
    await expect(oversized.json()).resolves.toMatchObject({ code: 'payload_too_large' });
  });

  it('accepts only a non-empty bounded dreamText field', async () => {
    const missing = await handler(request({ dreamText: '   ' }));
    expect(missing.status).toBe(400);
    await expect(missing.json()).resolves.toMatchObject({ code: 'dream_text_required' });

    const unexpected = await handler(request({ dreamText: 'A safe fixture dream.', profile: {} }));
    expect(unexpected.status).toBe(400);
    await expect(unexpected.json()).resolves.toMatchObject({ code: 'unexpected_field' });

    const tooLong = await handler(request({ dreamText: 'x'.repeat(ANALYZE_DREAM_MAX_TEXT_CHARACTERS + 1) }));
    expect(tooLong.status).toBe(413);
    await expect(tooLong.json()).resolves.toMatchObject({ code: 'dream_text_too_long' });
  });

  it('does not expose malformed-body details', async () => {
    const response = await handler(request(undefined, {
      json: jest.fn().mockRejectedValue(new Error('PRIVATE_PARSE_DETAIL')),
    }));
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body).toMatchObject({ code: 'invalid_json' });
    expect(JSON.stringify(body)).not.toContain('PRIVATE_PARSE_DETAIL');
  });
});
