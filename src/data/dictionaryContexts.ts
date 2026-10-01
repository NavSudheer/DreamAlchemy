/**
 * Dictionary Cultural Contexts Supplement
 *
 * A typed, content-only cultural-context supplement enriching existing dream dictionary symbols
 * with cross-cultural traditions, historical mythology, and anthropological perspectives.
 *
 * Educational and exploratory content only; not diagnostic, predictive, or medical advice.
 */

export interface CulturalTraditionEntry {
  tradition: string;
  summary: string;
}

export interface SymbolCulturalContext {
  symbolId: string;
  symbolName: string;
  culturalOverview: string;
  traditions: CulturalTraditionEntry[];
  archetypalTheme: string;
}

export const DICTIONARY_CULTURAL_CONTEXTS: Record<string, SymbolCulturalContext> = {
  wolf: {
    symbolId: 'wolf',
    symbolName: 'Wolf',
    culturalOverview: 'Across global folklore, wolves embody a profound duality: feared as apex wilderness predators yet revered as fierce clan protectors and loyal pack guardians.',
    traditions: [
      {
        tradition: 'Greco-Roman',
        summary: 'In Roman founding myth, the she-wolf Lupa suckled Romulus and Remus, honoring wolves as emblems of wild maternal guardianship and primal vitality celebrated during Lupercalia.',
      },
      {
        tradition: 'Norse',
        summary: 'Norse cosmology features both Fenrir, representing untamed cataclysmic power, and Odin\'s loyal wolves Geri and Freki, symbolizing watchful companionship and hunting wisdom.',
      },
      {
        tradition: 'Indigenous North American',
        summary: 'Many Plains and Pacific Northwest tribal cultures honor the wolf as a master teacher, scout, and exemplar of communal loyalty, devotion to family, and persevering endurance.',
      },
    ],
    archetypalTheme: 'Instinctual wisdom, communal loyalty, and the wild threshold between domestic civilization and nature.',
  },

  bird: {
    symbolId: 'bird',
    symbolName: 'Bird',
    culturalOverview: 'Birds universally signify transcendence, soul movement between realms, and freedom from earthly gravity across ancient cosmologies.',
    traditions: [
      {
        tradition: 'Ancient Egyptian',
        summary: 'The Ba was depicted as a human-headed bird, embodying the mobile aspect of the soul capable of flying freely between the mortal world and the spiritual afterlife.',
      },
      {
        tradition: 'Mesoamerican',
        summary: 'The Quetzal and hummingbird symbolized solar energy, spiritual swiftness, and sacred messengers connecting earthly life with the celestial skies.',
      },
      {
        tradition: 'Celtic',
        summary: 'Birds frequently functioned as supernatural messengers between the mortal world and the Otherworld (Tír na nÓg), often heralding transformation or guidance.',
      },
    ],
    archetypalTheme: 'Transcendence, elevated perspective, and messages arriving from the unconscious.',
  },

  snake: {
    symbolId: 'snake',
    symbolName: 'Snake',
    culturalOverview: 'As one of humanity\'s most ancient symbols, the serpent paradoxically embodies poison and medicine, mortal danger and cyclical rebirth.',
    traditions: [
      {
        tradition: 'Greco-Roman',
        summary: 'Associated with Asclepius, god of healing; snake skin shedding represented restorative renewal and the pharmacy (pharmakon) where poison in measured amounts heals.',
      },
      {
        tradition: 'Ancient Near Eastern',
        summary: 'From Eden\'s serpent of forbidden knowledge to the ouroboros eating its tail, the snake symbolizes ancient wisdom, cyclical eternity, and boundary testing.',
      },
      {
        tradition: 'Hindu & Yogic',
        summary: 'Kundalini energy is symbolized as a coiled serpent resting at the base of the spine, representing latent spiritual vitality awakening through consciousness.',
      },
      {
        tradition: 'Mesoamerican',
        summary: 'Quetzalcoatl, the Feathered Serpent, represents the harmonious synthesis of terrestrial earthly wisdom (the serpent) with celestial spirit (the bird).',
      },
    ],
    archetypalTheme: 'Regeneration, primordial life force, transformative shedding of the old, and healing.',
  },

  cat: {
    symbolId: 'cat',
    symbolName: 'Cat',
    culturalOverview: 'Cats hold widespread historical associations with feminine mystery, acute nocturnal perception, threshold guardianship, and self-sufficient independence.',
    traditions: [
      {
        tradition: 'Ancient Egyptian',
        summary: 'Revered in the feline goddess Bastet, protector of the domestic hearth, pregnant women, and home safety, celebrated for defending against venomous snakes and chaos.',
      },
      {
        tradition: 'East Asian',
        summary: 'The Japanese maneki-neko (beckoning cat) and folklore of protective spirits reflect feline qualities of quiet observation, welcoming prosperity, and discernment.',
      },
      {
        tradition: 'European Folklore',
        summary: 'Long associated with nighttime crossroads, intuition, and magical folklore, cats were admired for their quiet stealth, independence, and nocturnal vision.',
      },
    ],
    archetypalTheme: 'Intuitive insight, boundaries, mystery, and comfortable self-sufficiency.',
  },

  horse: {
    symbolId: 'horse',
    symbolName: 'Horse',
    culturalOverview: 'The horse symbolizes harnessed vitality, mobility, noble grace, and the human capacity to journey across challenging life terrains.',
    traditions: [
      {
        tradition: 'Celtic',
        summary: 'Revered in Epona, the protector goddess of horses, riders, and travel, who guided souls smoothly along major life thresholds and seasonal changes.',
      },
      {
        tradition: 'Central Asian & Steppe',
        summary: 'Honored as a sacred spiritual ally; the concept of the wind horse (lungta) embodies vital soul energy, good fortune, and uplifted spirit.',
      },
      {
        tradition: 'Greek',
        summary: 'Pegasus and the solar horses of Helios represent inspired elevation, harnessed physical power, and the noble quest to overcome daunting obstacles.',
      },
    ],
    archetypalTheme: 'Personal power, purposeful mobility, vitality, and navigating life journeys.',
  },

  child: {
    symbolId: 'child',
    symbolName: 'Child',
    culturalOverview: 'Across traditions, the child embodies uncorrupted potential, genuine innocence, vulnerability, and the spontaneous inception of psychological renewal.',
    traditions: [
      {
        tradition: 'Jungian & Classical',
        summary: 'The divine child archetype (puer aeternus) represents psychic rebirth, reminding adults of untainted curiosity, openness, and future growth potential.',
      },
      {
        tradition: 'East Asian & Taoist',
        summary: 'The Dao De Jing honors the infant (chizi) as the purest image of natural harmony, demonstrating that gentle flexibility overcomes rigid strength.',
      },
      {
        tradition: 'African Traditions',
        summary: 'Children are celebrated as links carrying ancestral wisdom forward, renewing community vitality and embodying blessings of continuity.',
      },
    ],
    archetypalTheme: 'Innocence, renewal, vulnerability, and emergent possibilities.',
  },

  stranger: {
    symbolId: 'stranger',
    symbolName: 'Stranger',
    culturalOverview: 'The unfamiliar figure represents the mystery of the outside world, ethical hospitality, and unacknowledged facets of the inner self.',
    traditions: [
      {
        tradition: 'Ancient Greek',
        summary: 'Under the sacred ethic of xenia (guest-friendship), strangers were welcomed warmly, as gods often roamed in disguise as humble travelers to test human virtue.',
      },
      {
        tradition: 'Middle Eastern',
        summary: 'Hospitality to the wanderer is a pillar of traditional wisdom; travelers were treated as potential carriers of unexpected blessings or lessons.',
      },
      {
        tradition: 'Analytical Psychology',
        summary: 'Encountering an unfamiliar figure often symbolizes meeting the Shadow or unrecognized potential residing in the personal unconscious.',
      },
    ],
    archetypalTheme: 'The unknown, moral discernment, external influence, and hidden self-aspects.',
  },

  teacher: {
    symbolId: 'teacher',
    symbolName: 'Teacher or Mentor',
    culturalOverview: 'The mentor figure represents ancestral wisdom, moral orientation during crises, and the universal impulse to seek guidance during life transitions.',
    traditions: [
      {
        tradition: 'Vedic & Indic',
        summary: 'The guru principle (dispelling darkness with light) honors the teacher as an essential guide who helps students navigate illusion and cultivate inner self-realization.',
      },
      {
        tradition: 'Classical Greek',
        summary: 'Originating with Mentor in Homer\'s Odyssey (guided by Athena), the archetype represents faithful stewardship, practical instruction, and elder counsel.',
      },
      {
        tradition: 'Indigenous Wisdom Traditions',
        summary: 'Elders and storytellers serve as living repositories of collective ethics and oral tradition, assisting seekers in finding their duty within the whole.',
      },
    ],
    archetypalTheme: 'Inner guidance, wisdom, personal growth, and clarity of direction.',
  },

  house: {
    symbolId: 'house',
    symbolName: 'House',
    culturalOverview: 'The house is a universal symbol for the structured self, family sanctuary, personal history, and the architectural layout of the human psyche.',
    traditions: [
      {
        tradition: 'Analytical Psychology',
        summary: 'Carl Jung elaborated the dream house as a layered portrait of consciousness: upper rooms represent daytime thinking, while hidden basements reflect deep unconscious memory.',
      },
      {
        tradition: 'Chinese Feng Shui',
        summary: 'The home is treated as an energetic mirror of its occupants, where room layout and flow (qi) correspond to emotional balance and physical well-being.',
      },
      {
        tradition: 'Ancient Roman',
        summary: 'The domestic household (domus) was watched over by ancestral spirits (lares) and domestic guardians (penates), symbolizing continuity of identity and roots.',
      },
    ],
    archetypalTheme: 'Architecture of the psyche, emotional security, family roots, and multi-faceted identity.',
  },

  water: {
    symbolId: 'water',
    symbolName: 'Water',
    culturalOverview: 'Water represents the primordial womb of life, the fluid emotional realm, cleansing ritual, and the uncontrollable depths of the unconscious mind.',
    traditions: [
      {
        tradition: 'Ancient Mesopotamian & Egyptian',
        summary: 'Creation myths recount the universe emerging from primordial waters (Abzu and Nun), establishing water as the fertile matrix of all form.',
      },
      {
        tradition: 'Taoist',
        summary: 'The Dao De Jing extols water as the supreme metaphor for wisdom: fluid, yielding, settling in humble valleys, yet shaping the hardest rock.',
      },
      {
        tradition: 'Global Ritual Traditions',
        summary: 'Immersion ceremonies (such as mikveh or baptism) symbolize spiritual purification, washing away past burdens to emerge renewed.',
      },
    ],
    archetypalTheme: 'Emotional depth, unconscious currents, purification, and adaptive flow.',
  },

  forest: {
    symbolId: 'forest',
    symbolName: 'Forest',
    culturalOverview: 'The forest represents the untamed wilderness, the threshold of the mysterious unknown, and the sacred realm where transformations occur.',
    traditions: [
      {
        tradition: 'Celtic & European Folklore',
        summary: 'The wildwood was an enchanted realm where ordinary social laws dissolved, forcing knights and seekers to confront their fears and discover their true mettle.',
      },
      {
        tradition: 'Arthurian Lore',
        summary: 'Knights entered the dense forest where no beaten track existed, symbolizing the solitary quest for individuation and self-knowledge.',
      },
      {
        tradition: 'Indigenous Circumpolar',
        summary: 'The forest is experienced as an animate sanctuary of interconnected kinship, requiring respectful silence, humility, and keen observation.',
      },
    ],
    archetypalTheme: 'The unknown unconscious, initiation, natural mystery, and discovering personal direction.',
  },

  key: {
    symbolId: 'key',
    symbolName: 'Key',
    culturalOverview: 'Keys symbolize access, authority, transitions across sealed barriers, and the solution to puzzling life dilemmas.',
    traditions: [
      {
        tradition: 'Greco-Roman',
        summary: 'Associated with Hecate, guardian of crossroads holding keys to the underworld gates, and Janus, god of portals, doorways, and beginnings.',
      },
      {
        tradition: 'Christian Mysticism',
        summary: 'Keys represent spiritual discernment, moral stewardship, and unlocking deeper understanding of sacred mysteries.',
      },
      {
        tradition: 'Folktales & Fairytales',
        summary: 'Golden or hidden keys grant passage to secret chambers, representing tested curiosity, solved enigmas, and earned opportunities.',
      },
    ],
    archetypalTheme: 'Access, problem solving, hidden knowledge, and unlocking personal potential.',
  },

  mirror: {
    symbolId: 'mirror',
    symbolName: 'Mirror',
    culturalOverview: 'Mirrors symbolize conscious self-reflection, unclouded truth, confrontation with vanity, and the divide between surface appearance and inner reality.',
    traditions: [
      {
        tradition: 'Ancient Egyptian',
        summary: 'Polished bronze mirrors were sacred to Hathor and shaped like sun disks, reflecting not merely physical form but inner radiant vitality.',
      },
      {
        tradition: 'Shinto',
        summary: 'The sacred mirror (Yata no Kagami) is an imperial treasure embodying supreme truth, wisdom, and unclouded reflection of the divine.',
      },
      {
        tradition: 'European Folklore',
        summary: 'Mirrors appear as truth-tellers that strip away illusions, revealing disguised motives and reminding seekers of mortality and authenticity.',
      },
    ],
    archetypalTheme: 'Self-reflection, truth versus illusion, identity, and inner authenticity.',
  },

  flying: {
    symbolId: 'flying',
    symbolName: 'Flying',
    culturalOverview: 'Flight represents liberation from material heaviness, elevated panoramic insight, and the ecstasy of transcendent consciousness.',
    traditions: [
      {
        tradition: 'Greek Mythology',
        summary: 'The flight of Daedalus and Icarus reflects human aspiration for freedom and invention alongside a reminder of measured balance and humility.',
      },
      {
        tradition: 'Shamanic Traditions',
        summary: 'Ecstatic spirit flight enables the practitioner to ascend to higher vantage points, survey the landscape, and return with healing perspective.',
      },
      {
        tradition: 'Taoist Philosophy',
        summary: 'The concept of untrammeled wandering (xiaoyaoyou) describes soaring on the cosmic wind in spontaneous, effortless alignment with the Dao.',
      },
    ],
    archetypalTheme: 'Transcendence, liberation from limitation, empowerment, and panoramic perspective.',
  },

  falling: {
    symbolId: 'falling',
    symbolName: 'Falling',
    culturalOverview: 'Falling reflects the universal human vulnerability to loss of footing, reminding dreamers of humility, surrender, and finding ground again.',
    traditions: [
      {
        tradition: 'Classical Mythology',
        summary: 'Myths of descent (katabasis, such as Orpheus or Persephone) demonstrate that falling into lower depths is often a precursor to profound transformation.',
      },
      {
        tradition: 'Universal Folk Wisdom',
        summary: 'Often physically tied to hypnic jerks as the body relaxes, falling is universally interpreted as a visceral cue to examine stability and trust in waking life.',
      },
      {
        tradition: 'Modern Psychological Views',
        summary: 'Falling reflects letting go of rigid control, surrendering to circumstances, or adjusting when old foundations prove insecure.',
      },
    ],
    archetypalTheme: 'Loss of control, vulnerability, surrendering tension, and discovering ground.',
  },

  love: {
    symbolId: 'love',
    symbolName: 'Love',
    culturalOverview: 'Love represents the profound drive toward connection, self-compassion, relational intimacy, and the integration of diverse aspects of the self.',
    traditions: [
      {
        tradition: 'Greco-Roman',
        summary: 'The myth of Cupid and Psyche traces the arduous maturation of the human soul (Psyche) through challenges toward divine, conscious union with Love (Amor).',
      },
      {
        tradition: 'Sufi Mysticism',
        summary: 'Poetry and dreams celebrate the Beloved, where romantic devotion and longing serve as mirror metaphors for the heart\'s yearning for spiritual wholeness.',
      },
      {
        tradition: 'Alchemical Philosophy',
        summary: 'The sacred marriage (coniunctio) symbolizes uniting opposites—reason and emotion, solar and lunar—into a unified, harmonious whole.',
      },
    ],
    archetypalTheme: 'Connection, self-acceptance, integration of opposites, and psychic wholeness.',
  },

  fear: {
    symbolId: 'fear',
    symbolName: 'Fear',
    culturalOverview: 'Fear serves as an essential protective signal, highlighting perceived threats, unaddressed shadow material, and boundaries awaiting conscious courage.',
    traditions: [
      {
        tradition: 'Folklore & Mythology',
        summary: 'Monsters, guardians, and sphinxes positioned at sacred thresholds challenge heroes to face inner trembling before entering deeper knowledge.',
      },
      {
        tradition: 'Tibetan Chöd Tradition',
        summary: 'Practitioners confront visualized terrifying figures directly with compassion, transforming primal fear into fearless presence and release of ego grasping.',
      },
      {
        tradition: 'Modern Emotional Psychology',
        summary: 'Fear is respected as an adaptive biological warning system that illuminates acute vulnerabilities, demanding grounded discernment rather than panic.',
      },
    ],
    archetypalTheme: 'Vulnerability, shadow confrontation, protective boundaries, and the threshold of courage.',
  },
};

/**
 * Retrieve the cultural context supplement for a given dream symbol ID
 */
export function getCulturalContextBySymbolId(symbolId: string): SymbolCulturalContext | undefined {
  return DICTIONARY_CULTURAL_CONTEXTS[symbolId];
}

/**
 * Retrieve all available dictionary cultural contexts as an array
 */
export function getAllCulturalContexts(): SymbolCulturalContext[] {
  return Object.values(DICTIONARY_CULTURAL_CONTEXTS);
}

/**
 * Check whether cultural context exists for a given symbol ID
 */
export function hasCulturalContext(symbolId: string): boolean {
  return symbolId in DICTIONARY_CULTURAL_CONTEXTS;
}
