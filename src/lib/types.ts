export const LANGUAGES = ["en", "fr"] as const;
export type Language = (typeof LANGUAGES)[number];

export const COLORS = ["success", "warning", "danger", "info", "app"] as const;
export type Color = (typeof COLORS)[number];

export const POSITIONS = ["relative", "absolute", "fixed"] as const;
export type Position = (typeof POSITIONS)[number];

export const GAPS = ["xs", "small", "medium", "large", "xl"] as const;
export type Gap = (typeof GAPS)[number];

export const PLACEMENTS = [
  "left",
  "center",
  "right",
  "around",
  "between",
  "evenly",
] as const;
export type Placement = (typeof PLACEMENTS)[number];

export const ALIGNMENTS = ["left", "center", "right", "stretch"] as const;
export type Alignment = (typeof ALIGNMENTS)[number];
