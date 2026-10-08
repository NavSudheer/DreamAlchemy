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

const request = (body = validBody) => ({
  method: 'POST',
  json: jest.fn().mockResolvedValue(body),
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

  it.each(['dream', 'dreamText', 'profile', 'birth'])('rejects the personal-data field %s', async (field) => {
    const response = await handler(request({ ...validBody, [field]: { private: 'personal data' } }));

    expect(response.status).toBe(400);
    expect(mockCreate).not.toHaveBeenCalled();
  });

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
});
