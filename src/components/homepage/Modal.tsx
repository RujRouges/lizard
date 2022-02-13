import { ExpressionsType } from ".";
import { moreVisibleEmotion } from "./utils";
import { keyframes, styled } from "../../shared/style/stitches.config";
import { useState } from "react";
import { Loader } from "../../shared/components/loader";

type ModalType = {
  setOpen: boolean;
  imageSrc: string;
  imageRef: React.MutableRefObject<HTMLImageElement>;
  expressions: ExpressionsType | null;
  onOutsideClick: () => void;
};

export const Modal: React.FC<ModalType> = ({
  setOpen,
  imageSrc,
  imageRef,
  expressions,
  onOutsideClick,
}) => {
  return (
    <>
      <Background onClick={onOutsideClick} isOpen={setOpen} />
      <Flex isOpen={setOpen}>
        <Row>
          <ImageContainer>
            <Img ref={imageRef} src={imageSrc} alt="" />
          </ImageContainer>
          <TextContainer>
            {expressions ? (
              <Column>
                <EmotionText>Il tuo stato d'animo è</EmotionText>
                <EmotionTitle>
                  {moreVisibleEmotion(expressions)!.toUpperCase()}
                </EmotionTitle>
                <EmotionText>
                  Prova ad ascoltare un po' di questa playlist
                </EmotionText>
              </Column>
            ) : (
              <Loader />
            )}
          </TextContainer>
        </Row>
      </Flex>
    </>
  );
};

const scaleUp = keyframes({
  "0%": { transform: "scale(0)" },
  "100%": { transform: "scale(1)" },
});

const scaleDown = keyframes({
  "100%": { transform: "scale(1)" },
  "0%": { transform: "scale(0)" },
});

const opacityUp = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 0.2 },
});

const Background = styled("div", {
  position: "absolute",
  height: "100vh",
  width: "100vw",
  backgroundColor: "$white",
  opacity: 0.2,
  variants: {
    isOpen: {
      true: {
        display: "block",
        animation: `${opacityUp} 600ms`,
      },
      false: {
        // animation: `${scaleDown} 600ms`,
        display: "none",
      },
    },
  },
});

const Flex = styled("div", {
  position: "absolute",
  zIndex: 10,
  height: "80%",
  width: "80%",
  borderRadius: 16,
  backgroundColor: "$background",
  variants: {
    isOpen: {
      true: {
        display: "block",
        animation: `${scaleUp} 600ms`,
      },
      false: {
        // animation: `${scaleDown} 600ms`,
        display: "none",
      },
    },
  },
});

const Row = styled("div", {
  display: "flex",
  flexDirection: "row",
  height: "100%",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
});

const Column = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  padding: 40,
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
});

const ImageContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 400,
  width: 400,
  overflow: "hidden",
  borderRadius: 16,
  boxShadow: "16px 16px $green",
});

const Img = styled("img", {
  height: "100%",
});

const TextContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: 400,
});

const EmotionTitle = styled("p", {
  color: "$orange",
  fontSize: 48,
  fontWeight: 700,
});

const EmotionText = styled("p", {
  color: "$white",
  fontSize: 24,
});
