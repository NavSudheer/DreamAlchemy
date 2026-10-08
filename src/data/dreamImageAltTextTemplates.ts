/**
 * Dream Image Accessible Alt-Text Templates
 *
 * A typed, content-only dataset of accessible alternative text descriptions
 * corresponding to every curated Dream Image prompt template in the catalog.
 *
 * Each template follows the project's descriptive alt-text and privacy guidelines:
 * - Describes only visible physical scenes, medium, lighting, and palette.
 * - Excludes subjective interpretations, psychological analyses, or emotion claims.
 * - Contains zero personal identifiers or private journal narratives.
 * - Avoids redundant "image of" or "picture of" prefixes.
 */

import { DreamImageStyle } from '../types/dreamImage';

export interface DreamImageAltTextTemplate {
  /** Identifier matching the corresponding DreamImagePromptTemplate id */
  templateId: string;
  /** Human-readable title of the corresponding template */
  templateTitle: string;
  /** Objective description of physical subjects and spatial layout */
  visibleScene: string;
  /** Visible lighting qualities and direction */
  lighting: string;
  /** Dominant visual color palette */
  palette: string;
  /** Default objective alt text describing the scene */
  baseAltText: string;
  /** Style-tailored accessible descriptions for each supported artistic medium */
  styleAltText: Record<DreamImageStyle, string>;
  /** The default recommended rendering style for this scene */
  recommendedStyle: DreamImageStyle;
}

export const DREAM_IMAGE_ALT_TEXT_TEMPLATES: DreamImageAltTextTemplate[] = [
  {
    templateId: 'threshold-passage',
    templateTitle: 'Luminous Threshold',
    visibleScene:
      'An ancient weathered stone doorway standing open in an open field of tall grass beneath violet clouds and distant constellations.',
    lighting:
      'Soft amber glow radiating outward from within the open door frame against dim twilight surroundings.',
    palette: 'Warm amber, soft violet, deep indigo night sky, and muted earthy green.',
    baseAltText:
      'Ancient stone doorway standing open in a field of tall grass, glowing softly with warm amber light beneath violet clouds and starry constellations.',
    styleAltText: {
      ethereal:
        'Ethereal artwork of an open stone doorway glowing with diffused amber light in a grassy meadow under a starry violet twilight sky with soft glowing mist.',
      surreal:
        'Surrealist composition featuring a free-standing stone doorway suspended in tall grass, emitting warm amber illumination beneath a cosmic violet sky.',
      watercolor:
        'Watercolor wash of an open stone doorway in an alpine meadow, painted in translucent violet, indigo, and glowing amber brushwork.',
      cinematic:
        'Cinematic widescreen landscape of an open ancient stone doorway casting long warm amber shadows across tall grass beneath a deep violet twilight sky.',
    },
    recommendedStyle: 'ethereal',
  },
  {
    templateId: 'reflective-stillness',
    templateTitle: 'Mirror of Stillness',
    visibleScene:
      'A glassy alpine lake at dusk mirroring a slender crescent moon and silver constellations, with smooth river stones scattered along the water edge.',
    lighting:
      'Silvery moonlight reflecting across the still lake surface with faint twilight luminescence along the horizon.',
    palette: 'Cool silver, deep twilight blue, charcoal gray, and smooth slate.',
    baseAltText:
      'Still alpine lake at dusk reflecting a slender crescent moon and silver constellations with smooth river stones along the shoreline.',
    styleAltText: {
      ethereal:
        'Ethereal visual composition of a glassy alpine lake mirroring a glowing silver crescent moon and constellations with luminous misty ripples.',
      surreal:
        'Surrealist reflection showing an unmoving mirror-smooth alpine lake perfectly duplicating a crescent moon and starlit sky across still water.',
      watercolor:
        'Watercolor illustration of a still alpine lake at dusk, with flowing pigment washes of indigo, charcoal, and delicate silver starlight.',
      cinematic:
        'Cinematic landscape of a still alpine lake at twilight, featuring crisp reflections of a crescent moon and river stones in soft moonlight.',
    },
    recommendedStyle: 'watercolor',
  },
  {
    templateId: 'canopy-sanctuary',
    templateTitle: 'Forest Sanctuary',
    visibleScene:
      'A woodland clearing within an ancient forest where spiraling tree boughs and moss-draped branches surround a smooth resting stone.',
    lighting:
      'Morning sunbeams filtering through dense overhead canopy mist, illuminating floating dust motes and green moss.',
    palette: 'Emerald green, golden sunlight, bark brown, and pale morning yellow.',
    baseAltText:
      'Ancient forest clearing with a smooth central resting stone beneath spiraling tree boughs and gentle sunbeams filtering through morning mist.',
    styleAltText: {
      ethereal:
        'Ethereal artwork depicting an empty forest clearing with diffused sunbeams glowing through misty canopy boughs onto an emerald mossy resting stone.',
      surreal:
        'Surrealist rendering of an ancient grove with spiraling tree branches arching over a smooth resting stone under luminous morning shafts of light.',
      watercolor:
        'Watercolor painting of a sheltered woodland clearing with wet-on-wet green moss bleeds and translucent amber sunbeams piercing the canopy.',
      cinematic:
        'Cinematic forest clearing framed by towering ancient trees with dramatic volumetric sunbeams highlighting a moss-covered central stone.',
    },
    recommendedStyle: 'cinematic',
  },
  {
    templateId: 'celestial-ascent',
    templateTitle: 'Celestial Ascent',
    visibleScene:
      'An expansive horizon overlooking a continuous sea of rolling white clouds at sunrise, with drifting feather silhouettes in the upper expanse.',
    lighting:
      'Low-angle golden sunlight skimming the top of undulating cloudbanks, transitioning into deep indigo at the upper atmosphere.',
    palette: 'Golden amber, sunrise coral, soft cloud white, and deep indigo.',
    baseAltText:
      'High-altitude horizon looking out across rolling white clouds at sunrise, with warm golden light stretching toward an indigo sky and drifting feathers.',
    styleAltText: {
      ethereal:
        'Ethereal composition above a sea of rolling clouds, with soft glowing golden sunrise light merging into a starry indigo sky with delicate feathers.',
      surreal:
        'Surrealist vista above undulating cloud formations bathed in golden dawn light with silhouetted feathers suspended motionless in deep indigo space.',
      watercolor:
        'Watercolor landscape featuring layered washes of golden sunrise, translucent cloud banks, and soft indigo sky with fine feather brushwork.',
      cinematic:
        'Cinematic aerial panoramic view above sweeping sunrise cloudbanks, illuminated with intense golden light transitioning into dark indigo sky.',
    },
    recommendedStyle: 'surreal',
  },
  {
    templateId: 'unfolding-labyrinth',
    templateTitle: 'Unfolding Pathway',
    visibleScene:
      'A concentric stone labyrinth of low weathered stones embedded in mossy earth, curving inward toward a still circular reflecting pool.',
    lighting:
      'Even twilight starlight casting gentle diffused highlights across curved stone edges and the smooth pool surface.',
    palette: 'Weathered stone gray, earthy moss green, slate blue, and starlight silver.',
    baseAltText:
      'Concentric spiral labyrinth of low weathered stones in mossy earth, winding inward toward a circular reflecting pool beneath twilight stars.',
    styleAltText: {
      ethereal:
        'Ethereal rendering of a concentric stone labyrinth in soft moss, glowing with subtle starlight silver as it curves toward a still reflecting pool.',
      surreal:
        'Surrealist geometric labyrinth of low stones arranged in precise concentric curves across a mossy field around a glass-like reflecting pool.',
      watercolor:
        'Watercolor study of a spiral stone labyrinth with organic green moss bleeds and muted slate tones leading to a still central pool under evening skies.',
      cinematic:
        'Cinematic overhead view of an ancient concentric stone labyrinth carved into earthy moss, with soft twilight shadows leading to a circular pool.',
    },
    recommendedStyle: 'ethereal',
  },
  {
    templateId: 'submerged-currents',
    templateTitle: 'Oceanic Depths',
    visibleScene:
      'An underwater ocean space with fluid ribbon-like currents carrying small luminous bioluminescent particles and drifting mineral filaments.',
    lighting:
      'Soft glowing aquamarine bioluminescence radiating from within water ribbons against deep midnight-blue ambient darkness.',
    palette: 'Deep ocean midnight blue, glowing aquamarine, cyan, and shimmering silver.',
    baseAltText:
      'Deep underwater scene with fluid currents carrying ribbons of soft aquamarine bioluminescence and shimmering silver particles through dark blue water.',
    styleAltText: {
      ethereal:
        'Ethereal aquatic composition of glowing aquamarine bioluminescent ribbons flowing gently through deep twilight-blue ocean waters.',
      surreal:
        'Surrealist underwater image featuring suspended luminous aquamarine ribbons and silver particles drifting in impossible fluid curves through deep blue space.',
      watercolor:
        'Watercolor wash of deep ocean blues with wet-on-wet turquoise bleeds and glittering silver accents depicting flowing bioluminescent currents.',
      cinematic:
        'Cinematic underwater scene with rich volumetric blue shadows and bright aquamarine light ribbons moving through clear deep-sea currents.',
    },
    recommendedStyle: 'watercolor',
  },
  {
    templateId: 'solitary-beacon',
    templateTitle: 'Guiding Beacon',
    visibleScene:
      'A weathered bronze lantern mounted on the post of a rustic wooden footbridge spanning across morning valley mist toward rolling hills in the distance.',
    lighting:
      'Warm golden light from within the lantern glass illuminating nearby wooden bridge planks against cool gray morning mist.',
    palette: 'Warm bronze, golden yellow, misty morning gray, and earthy weathered wood brown.',
    baseAltText:
      'Weathered bronze lantern casting warm golden light onto a wooden footbridge spanning morning valley mist toward rolling hills.',
    styleAltText: {
      ethereal:
        'Ethereal composition of a glowing bronze lantern on a rustic footbridge, surrounded by soft morning valley fog and distant rolling hills.',
      surreal:
        'Surrealist depiction of a lone luminous bronze lantern illuminating a wooden bridge that stretches through suspended valley clouds toward distant ridges.',
      watercolor:
        'Watercolor landscape showing a warm glowing lantern on a rustic wooden bridge, painted with loose misty gray washes and warm golden amber brushstrokes.',
      cinematic:
        'Cinematic morning scene of a solitary bronze lantern casting a warm golden glow across wooden footbridge planks in a misty mountain valley.',
    },
    recommendedStyle: 'cinematic',
  },
];

/**
 * Retrieve an accessible alt-text template by its template ID.
 */
export function getAltTextTemplateByTemplateId(
  templateId: string,
): DreamImageAltTextTemplate | undefined {
  const normalized = templateId.trim().toLowerCase();
  return DREAM_IMAGE_ALT_TEXT_TEMPLATES.find(
    item => item.templateId.toLowerCase() === normalized,
  );
}

/**
 * Retrieve all accessible alt-text templates.
 */
export function getAllAltTextTemplates(): DreamImageAltTextTemplate[] {
  return DREAM_IMAGE_ALT_TEXT_TEMPLATES;
}

/**
 * Check whether an alt-text template exists for a given template ID.
 */
export function hasAltTextTemplate(templateId: string): boolean {
  return getAltTextTemplateByTemplateId(templateId) !== undefined;
}

/**
 * Retrieve an accessible alt-text string for a template and style combination.
 * Falls back to the template's recommended style or base description if the
 * specific style is not found, and returns a general fallback if the templateId
 * is unrecognized.
 */
export function getAltTextForTemplate(
  templateId: string,
  style?: DreamImageStyle,
): string {
  const template = getAltTextTemplateByTemplateId(templateId);
  if (!template) {
    if (style) {
      return `Artistic visual reflection in ${style} style based on a curated abstract scene.`;
    }
    return 'Artistic visual reflection based on a curated abstract scene.';
  }

  if (style && template.styleAltText[style]) {
    return template.styleAltText[style];
  }

  return (
    template.styleAltText[template.recommendedStyle] ||
    template.baseAltText
  );
}

/**
 * Retrieve the objective visible scene description for a template.
 */
export function getVisibleSceneDescription(
  templateId: string,
): string | undefined {
  return getAltTextTemplateByTemplateId(templateId)?.visibleScene;
}

/**
 * Formats a custom objective scene description into a descriptive, accessible
 * alt-text string following the project's formatting guidance.
 */
export function composeAccessibleAltText(
  visibleScene: string,
  style: DreamImageStyle,
): string {
  const cleanScene = visibleScene.trim().replace(/^image of\s+/i, '');
  const styleLabel = style.charAt(0).toUpperCase() + style.slice(1);
  return `${styleLabel} artwork: ${cleanScene || 'Curated abstract scene.'}`;
}
