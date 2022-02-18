import type * as Stitches from "@stitches/react";
import { createStitches } from "@stitches/react";

export const {
  config,
  createTheme,
  css,
  getCssText,
  globalCss,
  keyframes,
  styled,
  theme,
} = createStitches({
  media: {
    bp1: "(max-width: 480px)",
    bp2: "(min-width: 480px)",
    bp3: "(min-width: 768px)",
    bp4: "(min-width: 992px)",
    bp5: "(min-width: 1200px)",
  },
  theme: {
    colors: {
      bg: "$greenDark",
      white: "#FAFAFA",
      greenLight: "#5EC29B",
      greenDark: "#384B42",
      blue: "#56B9F6",
      trasparent: "#FFFFFF00",
    },
    fonts: {
      default: "Poppins",
    },
    shadows: {
      white: "#FAFAFA",
      greenLight: "#5EC29B",
      red: "#C8356A",
    },
  },
  utils: {
    marginX: (value: Stitches.PropertyValue<"margin">) => ({
      marginLeft: value,
      marginRight: value,
    }),
  },
});
