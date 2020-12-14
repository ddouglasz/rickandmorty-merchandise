import { rgba } from "polished";

// Colors
const colors = {
  green: "#02514C",
  lime_green: "#32CD32",

  gray: "#B3B5C0",
  grayLight: "#D4D4D8",

  concrete: "#DFDCDB",
  concreteLight: "#EEEAE7",

  parchment: "#F8F5F4",
  white: "#FFFFFF",

  positive: "#0BA18E",
  selected: "#759FFF",
};

colors.primary = colors.cobalt;
colors.black = colors.midnight;
colors.text = colors.black;
colors.negative = colors.red;
colors.border = colors.concrete;

export { colors };

export const typography = {
  fontSize_xxxl: "32px",
  fontSize_xxl: "28px",
  fontSize_xl: "24px",
  fontSize_l: "20px",
  fontSize: "16px",
  fontSize_s: "14px",
  fontSize_xs: "12px",
  fontSize_xxs: "10px",
};

// Borders
export const borders = {
  borderRadius: "10px",
  borderRadius_l: "25px",
  boxShadow: `0px 4px 12px 0px ${rgba("#000", 0.12)}`,
  boxShadow_s: `0px 2px 6px 0px ${rgba("#000", 0.2)}`,
  boxShadow_l: `0px 12px 24px 0px ${rgba("#000", 0.2)}`,
};

// Breakpoints
export const breakpoints = {
  xlarge: "1600",
  large: "1024",
  medium: "768",
  small: "480",
};

// Ratio of vw to inches
// Corresponds to the breakpoints
export const ratios = {
  xlarge: 0.8, // 1vw = 0.8in
  large: 0.8, // 1vw = 0.8in
  medium: 1.5, // 1vw = 1.5in
};

// The Whole Theme
const theme = {
  colors,
  ratios,
  borders,
  typography,
};

export default theme;
