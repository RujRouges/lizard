import { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Loader } from "../../shared/components/loader";
import { css, styled } from "../../shared/style/stitches.config";

type WebcamType = {
  webcamRef: React.MutableRefObject<Webcam>;
  isEnabled: boolean;
  className?: string;
};

export const WebcamComponent: React.FC<WebcamType> = ({
  webcamRef,
  isEnabled,
  className,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(isEnabled);

  useEffect(() => {
    !isEnabled && setIsLoading(true);
  }, [isEnabled]);
  return (
    <Container className={className ? className : ""}>
      {isEnabled && (
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          mirrored={true}
          className={StyledWebcam()}
          onUserMedia={() => setIsLoading(false)}
        />
      )}
      {isLoading && <Loader />}
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 550,
  width: 550,
  backgroundColor: "$white",
  borderRadius: 4,
  boxShadow: "12px 12px $white",
  overflow: "hidden",
});

const StyledWebcam = css({
  height: "100%",
});
