/**
 * Primary color palette — แก้สีหลักของเว็บที่ไฟล์นี้ไฟล์เดียว
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
  DEFAULT: { h: 199, s: 89, l: 38 },
  foreground: { h: 210, s: 40, l: 98 },
  50: { h: 204, s: 100, l: 97 },
  100: { h: 204, s: 94, l: 94 },
  200: { h: 201, s: 94, l: 86 },
  300: { h: 199, s: 89, l: 72 },
  400: { h: 198, s: 83, l: 58 },
  500: { h: 199, s: 89, l: 48 },
  600: { h: 200, s: 90, l: 40 },
  700: { h: 201, s: 90, l: 32 },
  800: { h: 201, s: 80, l: 26 },
  900: { h: 202, s: 70, l: 20 },
  950: { h: 204, s: 80, l: 12 },
} as const satisfies Record<string, HslColor>;
