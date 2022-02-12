import { useRef } from "react";
import Webcam from "react-webcam";
import { css, styled } from "../../shared/style/stitches.config";

export const WebcamComponent = () => {
  const webcamRef = useRef() as React.MutableRefObject<Webcam>;

  return (
    <Container>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        mirrored={true}
        className={StyledWebcam()}
      />
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 500,
  width: 500,
  backgroundColor: "$white",
  borderRadius: 32,
  boxShadow: "16px 16px $orange",
  overflow: "hidden",
});

const StyledWebcam = css({
  borderRadius: 32,
  height: "100%",
});
