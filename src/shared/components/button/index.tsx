import { CSSProperties } from "react";
import { keyframes, styled } from "../../style/stitches.config";
import { Loader } from "../loader";

const scaleUp = keyframes({
  "0%": { transform: "scale(1)" },
  "100%": { transform: "scale(1.1)" },
});

export const Btn = styled("button", {
  "&:hover": {
    animation: `${scaleUp} 200ms`,
    transform: "scale(1.1)",
  },
  all: "unset",
  display: "flex",
  height: 60,
  minWidth: 240,
  width: "fit-content",
  padding: "0 16px",
  backgroundColor: "$white",
  color: "$greenDark",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "30px",
  fontSize: 32,
  fontWeight: 700,
});

type ButtonType = {
  isLoading?: boolean;
  onClick: () => void;
  style?: CSSProperties;
};

export const Button: React.FC<ButtonType> = ({
  isLoading,
  onClick,
  style,
  children,
}) => {
  return (
    <Btn onClick={onClick} style={style}>
      {!isLoading ? children : <Loader size="little" color="greenDark" />}
    </Btn>
  );
};
