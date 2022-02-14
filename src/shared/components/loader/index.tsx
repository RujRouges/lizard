import { keyframes, styled } from "../../style/stitches.config";

const spin = keyframes({
  "100%": { transform: " rotate(360deg)" },
});

export const Loader = styled("div", {
  border: "16px solid $white",
  borderRadius: "50%",
  borderTop: "16px solid $orange",
  width: 120,
  height: 120,
  animation: `${spin} 2s infinite`,
});
