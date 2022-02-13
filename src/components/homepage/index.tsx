import { styled } from "../../shared/style/stitches.config";
import { Title } from "../../shared/components/typography";
import { Button } from "../../shared/components/button";
import { WebcamComponent } from "./WebcamComponent";
import { Modal } from "./Modal";
import Pattern from "../../shared/static/background/pattern.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

type DetectionType = {
  expressions: ExpressionsType;
};

export type ExpressionsType = {
  angry: number;
  disgusted: number;
  fearful: number;
  happy: number;
  neutral: number;
  sad: number;
  surprised: number;
};

export const HomePage = () => {
  const imageRef = useRef() as React.MutableRefObject<HTMLImageElement>;
  const webcamRef = useRef() as React.MutableRefObject<Webcam>;
  const [image, setImage] = useState<string | null>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [expressions, setExpressions] = useState<ExpressionsType | null>(null);

  useEffect(() => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/model"),
      faceapi.nets.faceExpressionNet.loadFromUri("/model"),
    ]).catch((e) => console.log("Error: ", e));
  });

  useEffect(() => {
    handleImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  const handleImage = async () => {
    if (image) {
      const detection: DetectionType | undefined = await faceapi
        .detectSingleFace(
          imageRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceExpressions();

      if (detection) {
        setExpressions(detection.expressions);
      }
    }
  };

  const handleClick = () => {
    capture();
    setIsOpen(true);
  };

  return (
    <Flex>
      <Title>Ti leggo la faccia</Title>
      <Wrapper>
        <WebcamComponent webcamRef={webcamRef} isEnabled={!isOpen} />
      </Wrapper>
      <Button onClick={handleClick}>VAI</Button>
      <Modal
        setOpen={isOpen}
        imageSrc={image!}
        imageRef={imageRef}
        expressions={expressions}
        onOutsideClick={() => {
          setIsOpen(false);
        }}
      />
    </Flex>
  );
};

const Flex = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100vw",
  backgroundColor: "$background",
  alignItems: "center",
  justifyContent: "center",
  gap: 50,
  backgroundImage: `url(${Pattern})`,
  backgroundRepeat: "repeat",
  backgroundSize: 80,
});

const Wrapper = styled("div", {});

// const ButtonStyle = css({});
