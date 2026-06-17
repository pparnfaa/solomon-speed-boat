import type { HslColor } from "./primary";

/** สี semantic สำหรับ UI ทั่วไป (background, border, muted ฯลฯ) */
export const semantic = {
  background: { h: 210, s: 40, l: 98 },
  foreground: { h: 222, s: 47, l: 11 },
  card: { h: 0, s: 0, l: 100 },
  cardForeground: { h: 222, s: 47, l: 11 },
  muted: { h: 210, s: 40, l: 96 },
  mutedForeground: { h: 215, s: 16, l: 47 },
  accent: { h: 199, s: 89, l: 94 },
  accentForeground: { h: 201, s: 90, l: 32 },
  border: { h: 214, s: 32, l: 91 },
  ring: { h: 199, s: 89, l: 48 },
  destructive: { h: 0, s: 84, l: 60 },
  destructiveForeground: { h: 210, s: 40, l: 98 },
} as const satisfies Record<string, HslColor>;

export const semanticDark = {
  background: { h: 222, s: 47, l: 6 },
  foreground: { h: 210, s: 40, l: 98 },
  card: { h: 222, s: 47, l: 9 },
  cardForeground: { h: 210, s: 40, l: 98 },
  muted: { h: 217, s: 33, l: 14 },
  mutedForeground: { h: 215, s: 20, l: 65 },
  accent: { h: 201, s: 80, l: 18 },
  accentForeground: { h: 204, s: 94, l: 94 },
  border: { h: 217, s: 33, l: 18 },
  ring: { h: 199, s: 89, l: 48 },
  destructive: { h: 0, s: 63, l: 31 },
  destructiveForeground: { h: 210, s: 40, l: 98 },
} as const satisfies Record<string, HslColor>;
