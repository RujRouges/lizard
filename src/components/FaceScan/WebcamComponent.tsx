import Webcam from "react-webcam";
import { css, keyframes, styled } from "../../shared/style/stitches.config";
import ClosedEye from "../../shared/static/icons/closed_eye.svg";
import OpenEye from "../../shared/static/icons/open_eye.svg";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Paragraph } from "../../shared/components/typography";

type WebcamType = {
  webcamRef: React.MutableRefObject<Webcam>;
  className?: string;
  setIsEnabled: Dispatch<SetStateAction<boolean>>;
};

export const WebcamComponent: React.FC<WebcamType> = ({
  webcamRef,
  className,
  setIsEnabled,
}) => {
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    setIsEnabled(isActive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);
  return (
    <Flex className={className ? className : ""}>
      <EyeWrapper>
        <Eye
          isActive={isActive}
          src={isActive ? OpenEye : ClosedEye}
          onClick={() => setIsActive(!isActive)}
        />
      </EyeWrapper>
      <Container>
        {isActive ? (
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            mirrored={true}
            className={StyledWebcam()}
          />
        ) : (
          <OffPanel>
            <Paragraph textAlign={"center"} fontSize={32} fontWeight={400}>
              zzz . . . zzz . . .
            </Paragraph>
          </OffPanel>
        )}
      </Container>
    </Flex>
  );
};

const scaleUp = keyframes({
  "0%": { transform: "scale(1)" },
  "100%": { transform: "scale(1.1)" },
});

const Flex = styled("div", {
  display: "flex",
  justifyContent: "flex-end",
  height: 550,
  width: 550,
});

const Container = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
  backgroundColor: "$white",
  borderRadius: 4,
  boxShadow: "12px 12px $white",
  overflow: "hidden",
});

const EyeWrapper = styled("div", {
  "&:hover": {
    animation: `${scaleUp} 200ms`,
    transform: "scale(1.1)",
  },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  height: 90,
  width: 90,
  borderRadius: 45,
  backgroundColor: "$white",
  zIndex: 10,
  margin: 12,
});

const Eye = styled("img", {
  height: 80,
  width: 80,
  variants: {
    isActive: {
      false: {
        marginTop: 20,
      },
      true: {
        marginTop: 0,
      },
    },
  },
});

const StyledWebcam = css({
  height: "100%",
});

const OffPanel = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  backgroundColor: "$greyDark",
});
