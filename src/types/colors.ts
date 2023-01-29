import type { colors } from "../config";

export type Color = typeof colors[number];
export type ColorClass<Prefix extends string, Color extends string> = `${Prefix}_${Color}`;
