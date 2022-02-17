import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "../../shared/components/button";
import { Paragraph, Title } from "../../shared/components/typography";
import { css, styled } from "../../shared/style/stitches.config";
import { WebcamComponent } from "./WebcamComponent";
import * as faceapi from "face-api.js";
import { moreVisibleEmotion } from "./utils";

export type DetectionType = {
  expressions: ExpressionsType;
  age: number;
  gender: string;
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

export const FaceScan: React.FC = () => {
  const imageRef = useRef() as React.MutableRefObject<HTMLImageElement>;
  const webcamRef = useRef() as React.MutableRefObject<Webcam>;
  const [image, setImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [detection, setDetection] = useState<DetectionType | null>(null);

  useEffect(() => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/model"),
      faceapi.nets.faceExpressionNet.loadFromUri("/model"),
      faceapi.nets.ageGenderNet.loadFromUri("/model"),
    ]).catch((e) => console.log("Error: ", e));
  });

  useEffect(() => {
    handleImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    imageSrc && setImage(imageSrc);
  }, [webcamRef]);

  const handleImage = async () => {
    if (image) {
      const detection: DetectionType | undefined = await faceapi
        .detectSingleFace(
          imageRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceExpressions()
        .withAgeAndGender();

      if (detection) {
        setDetection(detection);
      }
    }
  };

  const handleClick = () => {
    if (!detection) {
      capture();
    } else {
      setImage("");
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  return (
    <Flex>
      <Column column={"first"}>
        <Title fontWeight={400}>
          <ThinText>face</ThinText>Scan
        </Title>
        {!image ? (
          <WebcamComponent
            webcamRef={webcamRef}
            isEnabled={true}
            className={WebcamStyle()}
          />
        ) : (
          <ImageContainer>
            <Img ref={imageRef} src={image} alt="" />
          </ImageContainer>
        )}

        <Button
          isLoading={isLoading}
          onClick={handleClick}
          style={{ marginTop: 32, alignSelf: "center" }}
        >
          {!detection ? "take the picture" : "refresh"}
        </Button>
      </Column>
      <Column column={"second"}>
        {detection && <InformationPanel detection={detection} />}
      </Column>
    </Flex>
  );
};

const InformationPanel: React.FC<{ detection: DetectionType }> = ({
  detection,
}) => {
  const mood = moreVisibleEmotion(detection.expressions);
  const age = detection.age.toFixed(0);
  return (
    <InformationContainer>
      <TitleContainer>
        <TitleStyle title={"first"}>
          <Paragraph fontSize={48} fontWeight={300}>
            <ThinText>your</ThinText> information
          </Paragraph>
        </TitleStyle>
        <TitleStyle title={"second"}>
          <Paragraph fontSize={64} fontWeight={300} color={"greenLight"}>
            <ThinText>your</ThinText> information
          </Paragraph>
        </TitleStyle>
      </TitleContainer>
      <Row justifyContents={"flexEnd"}>
        <Paragraph fontSize={32} fontWeight={100} color={"greenLight"}>
          your gender is
        </Paragraph>
        <Paragraph fontSize={48} fontWeight={300}>
          {detection.gender}
        </Paragraph>
      </Row>
      <Row justifyContents={"flexStart"}>
        <Paragraph fontSize={32} fontWeight={100}>
          your age is
        </Paragraph>
        <Paragraph fontSize={48} fontWeight={300} color={"greenLight"}>
          {age}
        </Paragraph>
      </Row>
      <Row justifyContents={"center"}>
        <Paragraph fontSize={32} fontWeight={100} color={"greenLight"}>
          and I think your mood is
        </Paragraph>
        <Paragraph fontSize={48} fontWeight={300}>
          {mood}
        </Paragraph>
      </Row>
    </InformationContainer>
  );
};

const Flex = styled("div", {
  display: "flex",
  height: "100vh",
  width: "100vw",
  background: "$bg",
});

const Column = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "50%",
  padding: 32,
  variants: {
    column: {
      first: {},
      second: {
        justifyContent: "center",
      },
    },
  },
});

const Row = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
  variants: {
    justifyContents: {
      center: { justifyContent: "center" },
      flexStart: { justifyContent: "flex-start" },
      flexEnd: { justifyContent: "flex-end" },
    },
  },
});

const WebcamStyle = css({
  marginTop: 32,
  alignSelf: "center",
});

const ImageContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 550,
  width: 550,
  backgroundColor: "$white",
  borderRadius: 4,
  boxShadow: "12px 12px $white",
  overflow: "hidden",
  marginTop: 32,
  alignSelf: "center",
});

const Img = styled("img", {
  height: "100%",
});

const InformationContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: 580,
  gap: 60,
});

const TitleContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
});

const TitleStyle = styled("span", {
  maxLines: 1,
  variants: {
    title: {
      first: {},
      second: {
        marginTop: -19,
        marginLeft: 43,
      },
    },
  },
});

const ThinText = styled("span", { fontWeight: 100 });
