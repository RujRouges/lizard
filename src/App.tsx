import React, { useEffect, useRef, useState, useCallback } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
import { styled } from "@stitches/react";
import { type } from "os";

type DetectionType = {
  expressions: ExpressionsType;
};

type ExpressionsType = {
  angry: number;
  disgusted: number;
  fearful: number;
  happy: number;
  neutral: number;
  sad: number;
  surprised: number;
};

const App = () => {
  const imageRef = useRef() as React.MutableRefObject<HTMLImageElement>;
  const webcamRef = useRef() as React.MutableRefObject<Webcam>;
  const [image, setImage] = useState<string | null>("");
  const [expressions, setExpressions] = useState<ExpressionsType | null>(null);

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

  useEffect(() => {
    const loadModel = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/model"),
        faceapi.nets.faceExpressionNet.loadFromUri("/model"),
      ])
        .then(handleImage)
        .catch((e) => console.log("Error: ", e));
    };

    imageRef && loadModel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  return (
    <Container>
      {!image ? (
        <>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            mirrored={true}
          />
          <button onClick={capture}>Capture photo</button>
        </>
      ) : (
        <img ref={imageRef} src={image} alt="" />
      )}
      <Row></Row>
      {expressions && (
        <Row>
          <Column>
            <Title>Arrabbiato</Title>
            <p>{`${parseFloat(expressions.angry.toFixed(2)) * 100} %`}</p>
          </Column>

          <Column>
            <Title>Disgustato</Title>
            <p>{`${parseFloat(expressions.disgusted.toFixed(2)) * 100} %`}</p>
          </Column>

          <Column>
            <Title>Impaurito</Title>
            <p>{`${parseFloat(expressions.fearful.toFixed(2)) * 100} %`}</p>
          </Column>

          <Column>
            <Title>Felice</Title>
            <p>{`${parseFloat(expressions.happy.toFixed(2)) * 100} %`}</p>
          </Column>

          <Column>
            <Title>Neutrale</Title>
            <p>{`${parseFloat(expressions.neutral.toFixed(2)) * 100} %`}</p>
          </Column>

          <Column>
            <Title>Triste</Title>
            <p>{`${parseFloat(expressions.sad.toFixed(2)) * 100} %`}</p>
          </Column>

          <Column>
            <Title>Sorpreso</Title>
            <p>{`${parseFloat(expressions.surprised.toFixed(2)) * 100} %`}</p>
          </Column>
        </Row>
      )}
    </Container>
  );
};

const Row = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: 10,
});

const Column = styled("div", {
  display: "flex",
  flexDirection: "column",
});

const Title = styled("p", {
  fontStyle: "bold",
});

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "50%",
  alignSelf: "center",
  justifySelf: "center",
});

export default App;
