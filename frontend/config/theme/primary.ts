/**
 * Primary color palette — Navy Blue (Lovable theme)
 * ค่า HSL จะถูก map ไปยัง CSS variables ใน styles/theme.css
 */

export type HslColor = {
  h: number;
  s: number;
  l: number;
};

export function toHslString({ h, s, l }: HslColor): string {
  return `${h} ${s}% ${l}%`;
}

/** สี primary หลักและโทนย่อย */
export const primary = {
  DEFAULT: { h: 213, s: 70, l: 20 },
  foreground: { h: 0, s: 0, l: 100 },
  50: { h: 213, s: 70, l: 97 },
  100: { h: 213, s: 70, l: 92 },
  200: { h: 213, s: 70, l: 85 },
  300: { h: 213, s: 70, l: 75 },
  400: { h: 205, s: 80, l: 65 },
  500: { h: 213, s: 70, l: 50 },
  600: { h: 213, s: 70, l: 35 },
  700: { h: 213, s: 70, l: 28 },
  800: { h: 213, s: 70, l: 22 },
  900: { h: 213, s: 70, l: 20 },
  950: { h: 213, s: 70, l: 15 },
} as const satisfies Record<string, HslColor>;
