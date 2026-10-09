/* global jest, describe, beforeEach, afterAll, it, expect */

const mockCreate = jest.fn();

jest.mock('openai', () => ({
  OpenAI: jest.fn().mockImplementation(() => ({
    chat: { completions: { create: mockCreate } },
  })),
}));

const handler = require('../../../api/astrology-reflection').default;

const validBody = {
  chart: {
    precision: 'date-time-timezone',
    placements: [{ body: 'Sun', sign: 'Taurus', house: 11 }],
    aspects: [{ type: 'Trine', fromBody: 'Sun', toBody: 'Moon', orbDegrees: 2.3 }],
    uncertaintyNotes: [],
  },
  consent: {
    reflectiveUseAcknowledged: true,
    externalProcessingAllowed: true,
  },
};

const request = (body = validBody, overrides = {}) => ({
  method: 'POST',
  json: jest.fn().mockResolvedValue(body),
  ...overrides,
});

describe('astrology reflection route', () => {
  const originalEnvironment = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = {
      ...originalEnvironment,
      ASTROLOGY_FEATURE_ENABLED: 'true',
      OPENAI_API_KEY: 'server-only-test-key',
    };
  });

  afterAll(() => {
    process.env = originalEnvironment;
  });

  it('stays unavailable until explicitly enabled', async () => {
    process.env.ASTROLOGY_FEATURE_ENABLED = 'false';

    const response = await handler(request());

    expect(response.status).toBe(503);
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it('requires external-processing consent', async () => {
    const response = await handler(request({
      ...validBody,
      consent: { reflectiveUseAcknowledged: true, externalProcessingAllowed: false },
    }));

    expect(response.status).toBe(400);
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it('requires JSON and rejects oversized request bodies before model work', async () => {
    const invalidType = await handler(request(validBody, {
      headers: { get: jest.fn((name) => name === 'content-type' ? 'text/plain' : null) },
    }));
    expect(invalidType.status).toBe(415);
    await expect(invalidType.json()).resolves.toMatchObject({ code: 'invalid_content_type' });

    const oversized = await handler(request(validBody, {
      headers: { get: jest.fn((name) => name === 'content-length' ? '70000' : 'application/json') },
    }));
    expect(oversized.status).toBe(413);
    await expect(oversized.json()).resolves.toMatchObject({ code: 'payload_too_large' });
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it.each(['dream', 'dreamText', 'profile', 'birth'])('rejects the personal-data field %s', async (field) => {
    const response = await handler(request({ ...validBody, [field]: { private: 'personal data' } }));

    expect(response.status).toBe(400);
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it.each(['birthDate', 'birthTime', 'timezone', 'latitude', 'longitude', 'locationLabel', 'coordinates'])(
    'rejects the direct birth-detail field %s',
    async (field) => {
      const response = await handler(request({ ...validBody, [field]: 'private birth detail' }));

      expect(response.status).toBe(400);
      await expect(response.json()).resolves.toMatchObject({ code: 'sensitive_data_rejected' });
      expect(mockCreate).not.toHaveBeenCalled();
    },
  );

  it('sends a compact chart-only prompt with capped output settings', async () => {
    mockCreate.mockResolvedValue({
      choices: [{ message: { content: 'A brief, optional metaphor for reflection.' } }],
    });

    const response = await handler(request());
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(mockCreate).toHaveBeenCalledTimes(1);
    const completionRequest = mockCreate.mock.calls[0][0];
    expect(completionRequest.max_tokens).toBe(350);
    expect(completionRequest.messages[1].content).toContain('"body":"Sun"');
    expect(completionRequest.messages[1].content).not.toContain('locationLabel');
    expect(completionRequest.messages[0].content).toContain('Never predict events');
    expect(result).toMatchObject({
      reflection: 'A brief, optional metaphor for reflection.',
    });
    expect(result.disclosure).toContain('not factual or predictive');
  });

  it('maps an aborted model request to a timeout error', async () => {
    const timeout = new Error('aborted');
    timeout.name = 'AbortError';
    mockCreate.mockRejectedValue(timeout);

    const response = await handler(request());

    expect(response.status).toBe(504);
    await expect(response.json()).resolves.toMatchObject({ code: 'provider_timeout' });
  });
});
