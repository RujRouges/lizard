import { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Loader } from "../../shared/components/loader";
import { css, styled } from "../../shared/style/stitches.config";

type WebcamType = {
  webcamRef: React.MutableRefObject<Webcam>;
  isEnabled: boolean;
};

export const WebcamComponent: React.FC<WebcamType> = ({
  webcamRef,
  isEnabled,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(isEnabled);

  useEffect(() => {
    !isEnabled && setIsLoading(true);
  }, [isEnabled]);
  return (
    <Container>
      {isEnabled && (
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          mirrored={true}
          className={StyledWebcam()}
          onUserMedia={() => setIsLoading(false)}
        />
      )}
      {isLoading && <Loader className={PositionAbsolute()} />}
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
  boxShadow: "16px 16px $orange, -16px -16px $green",
  overflow: "hidden",
});

const StyledWebcam = css({
  height: "100%",
});

const PositionAbsolute = css({ position: "absolute" });
