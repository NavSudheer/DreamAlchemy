import {
  getAccessibilityAltTextGuidance,
  getSafetyChecklist,
  isDescriptiveAltText,
} from '../dreamImageSafetyGuidelines';
import { DREAM_IMAGE_PROMPT_TEMPLATES } from '../dreamImagePromptTemplates';
import { composeAccessibleAltText, getAltTextForTemplate } from '../dreamImageAltTextTemplates';
import { SUPPORTED_DREAM_IMAGE_STYLES } from '../dreamImageStyleMetadata';

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

  it('provides a descriptive alt-text option for every curated template and style', () => {
    for (const template of DREAM_IMAGE_PROMPT_TEMPLATES) {
      for (const style of SUPPORTED_DREAM_IMAGE_STYLES) {
        expect(isDescriptiveAltText(getAltTextForTemplate(template.id, style))).toBe(true);
      }
    }
  });

  it('uses descriptive project fallbacks for unknown or empty scenes', () => {
    expect(isDescriptiveAltText(getAltTextForTemplate('unknown-template', 'watercolor'))).toBe(true);
    expect(composeAccessibleAltText('', 'ethereal')).toBe('Ethereal artwork: Curated abstract scene.');
  });
});
