import { colors, rgbColors, colorNames } from "./mapUtils";

const getBin = (value: number, bins: number[]): number =>
  Math.max(...bins.filter((bin) => value >= bin));

export const getColor = (value: number, bins: number[]) =>
  colors[colorNames[bins.indexOf(getBin(value, bins))]];

export const getRgb = (value: number, bins: number[]) =>
  rgbColors[colorNames[bins.indexOf(getBin(value, bins))]];
