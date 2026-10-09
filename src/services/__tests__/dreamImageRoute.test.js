/* global describe, beforeEach, afterAll, it, expect */

const {
  default: handler,
  DREAM_IMAGE_ALLOWED_PROMPTS,
  DREAM_IMAGE_ALLOWED_STYLES,
} = require('../../../api/dream-image');
const { DREAM_IMAGE_PROMPT_TEMPLATES } = require('../../data/dreamImagePromptTemplates');
const { DREAM_IMAGE_STYLE_LIST } = require('../../data/dreamImageStyleMetadata');

const validBody = {
  visualReflectionPrompt: 'An ancient stone doorway standing open in a quiet field of tall grass, glowing softly with warm amber twilight beneath violet clouds and distant constellations.',
  style: 'ethereal',
  consent: {
    artisticUseAcknowledged: true,
    externalProcessingAllowed: true,
  },
};

const request = (body = validBody, overrides = {}) => ({
  method: 'POST',
  headers: { get: () => null },
  json: jest.fn().mockResolvedValue(body),
  ...overrides,
});

describe('Dream Image route request boundary', () => {
  const originalEnvironment = process.env;

  beforeEach(() => {
    process.env = { ...originalEnvironment, DREAM_IMAGE_FEATURE_ENABLED: 'true' };
  });

  afterAll(() => {
    process.env = originalEnvironment;
  });

  it('keeps the server allowlists synchronized with the curated app catalog', () => {
    expect(DREAM_IMAGE_ALLOWED_PROMPTS).toEqual(
      DREAM_IMAGE_PROMPT_TEMPLATES.map(template => template.promptText),
    );
    expect(DREAM_IMAGE_ALLOWED_STYLES).toEqual(
      DREAM_IMAGE_STYLE_LIST.map(style => style.style),
    );
  });

  it('stays unavailable until explicitly enabled', async () => {
    process.env.DREAM_IMAGE_FEATURE_ENABLED = 'false';
    const response = await handler(request());
    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({ code: 'feature_disabled' });
  });

  it('requires JSON and rejects oversized bodies', async () => {
    const invalidType = await handler(request(validBody, {
      headers: { get: name => name === 'content-type' ? 'text/plain' : null },
    }));
    expect(invalidType.status).toBe(415);
    await expect(invalidType.json()).resolves.toMatchObject({ code: 'invalid_content_type' });

    const oversized = await handler(request(validBody, {
      headers: { get: name => name === 'content-length' ? '16001' : null },
    }));
    expect(oversized.status).toBe(413);
    await expect(oversized.json()).resolves.toMatchObject({ code: 'payload_too_large' });
  });

  it('requires both consent acknowledgements', async () => {
    const response = await handler(request({
      ...validBody,
      consent: { artisticUseAcknowledged: true, externalProcessingAllowed: false },
    }));
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({ code: 'consent_required' });
  });

  it.each(['dreamId', 'dreamText', 'analysis', 'profile', 'extra'])(
    'rejects the non-contract field %s',
    async field => {
      const response = await handler(request({ ...validBody, [field]: 'private-or-unexpected' }));
      expect(response.status).toBe(400);
      await expect(response.json()).resolves.toMatchObject({ code: 'unexpected_field' });
    },
  );

  it('rejects prompts and styles outside the exact curated allowlists', async () => {
    const promptResponse = await handler(request({ ...validBody, visualReflectionPrompt: 'Draw my dream.' }));
    expect(promptResponse.status).toBe(400);
    await expect(promptResponse.json()).resolves.toMatchObject({ code: 'prompt_not_allowed' });

    const styleResponse = await handler(request({ ...validBody, style: 'photorealistic' }));
    expect(styleResponse.status).toBe(400);
    await expect(styleResponse.json()).resolves.toMatchObject({ code: 'style_not_allowed' });
  });

  it('accepts the exact safe contract but calls no provider', async () => {
    const response = await handler(request());
    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({ code: 'provider_unavailable' });
  });
});
