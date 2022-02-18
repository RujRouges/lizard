import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "../../shared/components/button";
import { Title } from "../../shared/components/typography";
import { css, styled } from "../../shared/style/stitches.config";
import { WebcamComponent } from "./WebcamComponent";
import * as faceapi from "face-api.js";
import { InformationPanel } from "./InformationPanel";
import { notify } from "../../shared/components/notification";

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
  const [isEnabled, setIsEnabled] = useState<boolean>(true);

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
        setIsLoading(false);
        notify("success", "Good photo! You look amazing!");
      } else {
        setImage("");
        setDetection(null);
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
        notify("warning", "An error occurred! Please try again!");
      }
    }
  };

  const handleClick = () => {
    setIsLoading(true);
    if (!detection) {
      capture();
    } else {
      setImage("");
      setDetection(null);
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  return (
    <Flex>
      <TitleWrapper>
        <Title fontWeight={400}>
          <ThinText>face</ThinText>Scan
        </Title>
      </TitleWrapper>
      <Container>
        <Column column={"first"}>
          {!image ? (
            <WebcamComponent
              webcamRef={webcamRef}
              className={WebcamStyle()}
              setIsEnabled={setIsEnabled}
            />
          ) : (
            <ImageContainer>
              <Img ref={imageRef} src={image} alt="" />
            </ImageContainer>
          )}

          <Button
            isLoading={isLoading}
            disabled={!isEnabled}
            onClick={handleClick}
            style={{ marginTop: 32, alignSelf: "center" }}
          >
            {!detection ? "take the picture" : "refresh"}
          </Button>
        </Column>
        <Column column={"second"}>
          <InformationPanel detection={detection} />
        </Column>
      </Container>
    </Flex>
  );
};

const Flex = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100vw",
  background: "$bg",
});

const TitleWrapper = styled("span", {
  padding: "32px 0 0 32px",
});

const Container = styled("div", {
  display: "flex",
  width: "1440px",
  margin: "auto",
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

const WebcamStyle = css({
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
  boxShadow: "12px 12px $greenLight",
  overflow: "hidden",
  alignSelf: "center",
});

const Img = styled("img", {
  height: "100%",
});

const ThinText = styled("span", { fontWeight: 100 });
