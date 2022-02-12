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
      background: "$darkBlue",
      darkBlue: "#191C2F",
      white: "#EFF0F3",
      green: "#055A51",
    },
    fonts: {
      default: "Lato",
    },
    shadows: {
      orange: "#FB965A",
    },
  },
  utils: {
    marginX: (value: Stitches.PropertyValue<"margin">) => ({
      marginLeft: value,
      marginRight: value,
    }),
  },
});
