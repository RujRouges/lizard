import { keyframes, styled } from "../../style/stitches.config";

const scaleUp = keyframes({
  "0%": { transform: "scale(1)" },
  "100%": { transform: "scale(1.1)" },
});

export const Button = styled("button", {
  "&:hover": {
    animation: `${scaleUp} 200ms`,
    transform: "scale(1.1)",
  },
  all: "unset",
  display: "flex",
  height: 60,
  minWidth: 120,
  width: "fit-content",
  padding: "0 16px",
  backgroundColor: "#055A51",
  color: "$white",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8,
  fontSize: 32,
  fontWeight: 700,
});
