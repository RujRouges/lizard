import Webcam from "react-webcam";
import { css, styled } from "../../shared/style/stitches.config";

type WebcamType = {
  webcamRef: React.MutableRefObject<Webcam>;
  isEnabled: boolean;
};

export const WebcamComponent: React.FC<WebcamType> = ({
  webcamRef,
  isEnabled,
}) => {
  return (
    <Container>
      {isEnabled ? (
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          mirrored={true}
          className={StyledWebcam()}
        />
      ) : (
        ""
      )}
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
  borderRadius: 16,
  boxShadow: "16px 16px $orange",
  overflow: "hidden",
});

const StyledWebcam = css({
  height: "100%",
});
