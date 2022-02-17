import { keyframes, styled } from "../../style/stitches.config";

type LoaderProps = {
  size?: "little" | "big";
  color?: "white" | "greenLight" | "greenDark";
};

export const Loader: React.FC<LoaderProps> = ({
  size = "big",
  color = "white",
}) => {
  return (
    <LoaderContainer color={color} size={size}>
      <LoaderInner color={color} size={size} />
    </LoaderContainer>
  );
};

const spin = keyframes({
  "100%": { transform: " rotate(360deg)" },
});

const LoaderContainer = styled("div", {
  animation: `${spin} 2s infinite`,
  borderStyle: "solid",
  borderRadius: "50%",
  borderRightColor: "$trasparent",
  borderBottomColor: "$trasparent",
  borderLeftColor: "$trasparent",
  height: 113,
  position: "relative",
  width: 113,
  zIndex: "10",
  variants: {
    color: {
      white: {
        borderTopColor: "$white",
      },
      greenLight: {
        borderTopColor: "$greenLight",
      },
      greenDark: {
        borderTopColor: "$greenDark",
      },
    },
    size: {
      little: {
        height: 22,
        width: 22,
        borderWidth: "3px",
      },
      big: {
        height: 113,
        width: 113,
        borderWidth: "8px",
      },
    },
  },
});

const LoaderInner = styled("div", {
  borderWidth: "1px",
  borderStyle: "solid",
  borderRadius: "50%",
  left: "50%",
  position: "absolute",
  top: "50%",
  transform: "translate(-50%, -50%)",
  variants: {
    color: {
      white: {
        borderColor: "$white",
      },
      greenLight: {
        borderColor: "$greenLight",
      },
      greenDark: {
        borderColor: "$greenDark",
      },
    },
    size: {
      little: {
        height: 24,
        width: 24,
      },
      big: {
        height: 120,
        width: 120,
      },
    },
  },
});
