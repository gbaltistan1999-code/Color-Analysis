/**
 * "Who is a [season]?" — typical natural coloring for each season, described by
 * look rather than by naming real people. Keyed by season slug.
 */
export const seasonLooks: Record<string, { hair: string; eyes: string; skin: string; summary: string }> = {
  "light-spring": {
    hair: "Golden or strawberry blonde, light golden brown",
    eyes: "Light blue, aqua, light green or soft hazel",
    skin: "Fair to light with a peachy or golden glow",
    summary: "Think sunlit and delicate — everything is light, warm and gently clear.",
  },
  "warm-spring": {
    hair: "Golden blonde, honey, strawberry or golden auburn",
    eyes: "Warm green, hazel, golden brown or turquoise",
    skin: "Light to medium with golden or peachy warmth; freckles are common",
    summary: "Golden all over — hair, skin and eyes share the same sunny warmth.",
  },
  "bright-spring": {
    hair: "Golden brown, warm medium brown or bright golden blonde",
    eyes: "Very clear blue, green or topaz — eyes that sparkle",
    skin: "Light to medium, clear and slightly warm",
    summary: "Vivid and lively — clear eyes and noticeable contrast are the giveaway.",
  },
  "light-summer": {
    hair: "Ash blonde, light ash brown, or platinum as a child",
    eyes: "Soft blue, grey-blue or light grey-green",
    skin: "Fair to light with pink or rosy hints",
    summary: "Airy and cool — soft, light coloring with very little contrast.",
  },
  "cool-summer": {
    hair: "Ash brown or cool medium brown, often with a smoky cast",
    eyes: "Grey-blue, cool blue or soft cool brown",
    skin: "Light to medium with rosy or neutral-pink undertones",
    summary: "Cool and refined — a calm, blue-based look with moderate contrast.",
  },
  "soft-summer": {
    hair: "Mousy or ash brown, dark ash blonde, sometimes greying early",
    eyes: "Grey-green, soft hazel or muted blue",
    skin: "Light to medium, often neutral-cool and slightly greyed",
    summary: "Gentle and blended — nothing about the coloring shouts.",
  },
  "soft-autumn": {
    hair: "Light-to-medium golden brown, dark blonde or soft auburn",
    eyes: "Soft hazel, olive green or warm muted brown",
    skin: "Light to medium with a warm, sometimes olive cast",
    summary: "Warm and mellow — earthy coloring softened as if by a light mist.",
  },
  "warm-autumn": {
    hair: "Auburn, copper, golden brown or chestnut",
    eyes: "Golden brown, amber, warm hazel or olive green",
    skin: "Light to deep with clear golden warmth",
    summary: "Rich and spicy — red or golden tones run through the whole look.",
  },
  "deep-autumn": {
    hair: "Dark chestnut, dark auburn or deep brown",
    eyes: "Dark brown, deep hazel or deep olive",
    skin: "Medium to deep with warm, golden or bronzed undertones",
    summary: "Deep and warm — dark features with a glowing, earthy richness.",
  },
  "deep-winter": {
    hair: "Very dark brown to black",
    eyes: "Dark brown, black-brown or deep cool hazel",
    skin: "Medium to deep with neutral-cool undertones",
    summary: "Bold and dramatic — deep coloring with striking contrast.",
  },
  "cool-winter": {
    hair: "Dark brown to black with no golden glints, or striking silver",
    eyes: "Icy blue, cool grey or dark cool brown",
    skin: "Porcelain to deep, with clearly cool or rosy undertones",
    summary: "Icy and crisp — high contrast and unmistakably cool.",
  },
  "bright-winter": {
    hair: "Dark brown or black",
    eyes: "Brilliant blue, green or clear dark brown with a bright sparkle",
    skin: "Fair to medium, clear and cool-neutral",
    summary: "Dazzling and high-contrast — the eyes usually steal the show.",
  },
};
