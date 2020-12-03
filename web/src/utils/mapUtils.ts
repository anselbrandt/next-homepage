export const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
import { RGBAColor } from "@deck.gl/core/utils/color";

export const initialViewState = {
  longitude: -73.645,
  latitude: 45.56,
  zoom: 11,
  pitch: 0,
  bearing: -57.2,
};

export const testPath = [
  {
    path: [
      [-73.964792, 45.413806],
      [-73.587076, 45.503546],
      [-73.48159, 45.701829],
    ],
    name: "Montreal",
  },
];

export const positionGenerator = (arr: any) =>
  arr.map((vehicle: any) => {
    return {
      id: vehicle.id,
      timestamp: vehicle.timestamp,
      route: vehicle.routeId,
      position: [vehicle.position.longitude, vehicle.position.latitude],
    };
  });

export const getMetroColors = (str: string, filter: any): RGBAColor => {
  let colorValue: RGBAColor = [0, 0, 0];
  switch (str) {
    case "verte":
      colorValue = [0, 128, 0];
      break;
    case "orange":
      colorValue = [255, 140, 0];
      break;
    case "jaune":
      colorValue = [255, 215, 0];
      break;
    case "bleue":
      colorValue = [30, 144, 255];
      break;
    default:
      colorValue = filter ? [255, 99, 71] : [160, 160, 180];
  }
  return colorValue;
};

export const hexToRgb = (hex: string): RGBAColor => {
  hex = hex.replace(/^#/, "");
  hex = hex.slice(0, 6);
  const number = Number.parseInt(hex, 16);
  const red = number >> 16;
  const green = (number >> 8) & 255;
  const blue = number & 255;
  return [red, green, blue];
};

interface Colors {
  [color: string]: string;
}

export const colors: Colors = {
  maroon: "rgb(62, 9, 6)",
  red: "rgb(154, 38, 30)",
  orange: "rgb(239, 108, 51)",
  yellow: "rgb(215, 215, 1)",
  turquoise: "rgb(0, 220, 203)",
  skyblue: "rgb(0, 165, 210)",
  royalblue: "rgb(26, 79, 129)",
  navy: "rgb(0, 39, 54)",
};

interface RgbColors {
  [color: string]: [number, number, number];
}

export const rgbColors: RgbColors = {
  maroon: [62, 9, 6],
  red: [154, 38, 30],
  orange: [239, 108, 51],
  yellow: [215, 215, 1],
  turquoise: [0, 220, 203],
  skyblue: [0, 165, 210],
  royalblue: [26, 79, 129],
  navy: [0, 39, 54],
};

export const colorNames = [
  "maroon",
  "red",
  "orange",
  "yellow",
  "turquoise",
  "skyblue",
  "royalblue",
  "navy",
];

export const colorsArr = [
  "rgb(62, 9, 6)",
  "rgb(154, 38, 30)",
  "rgb(239, 108, 51)",
  "rgb(215, 215, 1)",
  "rgb(0, 220, 203)",
  "rgb(0, 165, 210)",
  "rgb(26, 79, 129)",
  "rgb(0, 39, 54)",
];
