import {
  getAccessibilityAltTextGuidance,
  getSafetyChecklist,
  isDescriptiveAltText,
} from '../dreamImageSafetyGuidelines';

describe('dream image safety guidance', () => {
  it('rejects missing, placeholder, and filename alternative text', () => {
    expect(isDescriptiveAltText('')).toBe(false);
    expect(isDescriptiveAltText('dream art')).toBe(false);
    expect(isDescriptiveAltText('generated_canvas_827391.png')).toBe(false);
  });

  it('accepts a concise visual description', () => {
    expect(isDescriptiveAltText('Watercolor scene of a moonlit alpine lake under violet clouds.')).toBe(true);
  });

  it('covers every required preview boundary', () => {
    expect(getSafetyChecklist().map(item => item.guidelineId)).toEqual([
      'safety-disallowed-raw-journal',
      'safety-disallowed-personal-identifiers',
      'safety-disallowed-medical-predictive',
      'safety-inaccessible-alt-text',
    ]);
    expect(getAccessibilityAltTextGuidance()?.category).toBe('accessibility');
  });
});
