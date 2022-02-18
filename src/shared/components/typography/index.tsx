import { styled } from "../../style/stitches.config";

export const Title = styled("h1", {
  all: "unset",
  fontSize: 80,
  color: "$white",
  variants: {
    fontWeight: {
      100: { fontWeight: 100 },
      300: { fontWeight: 300 },
      400: { fontWeight: 400 },
      600: { fontWeight: 600 },
    },
  },
});

export const Paragraph = styled("p", {
  all: "unset",
  color: "$white",
  variants: {
    textAlign: {
      start: { textAlign: "start" },
      center: { textAlign: "center" },
      end: { textAlign: "end" },
    },
    color: {
      greenDark: {
        color: "$greenDark",
      },
      greenLight: {
        color: "$greenLight",
      },
    },
    fontSize: {
      16: { fontSize: 16 },
      24: { fontSize: 24 },
      32: { fontSize: 32 },
      48: { fontSize: 48 },
      64: { fontSize: 64 },
    },
    fontWeight: {
      100: { fontWeight: 100 },
      300: { fontWeight: 300 },
      400: { fontWeight: 400 },
      600: { fontWeight: 600 },
    },
  },
});
