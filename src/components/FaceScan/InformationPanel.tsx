import { DetectionType } from ".";
import { Paragraph } from "../../shared/components/typography";
import { styled } from "../../shared/style/stitches.config";
import { moreVisibleEmotion } from "./utils";

export const InformationPanel: React.FC<{
  detection: DetectionType | null;
}> = ({ detection }) => {
  if (!detection) {
    return (
      <InformationContainer>
        <Paragraph fontSize={32} fontWeight={100} textAlign={"end"}>
          please take a picture to get a prediction
        </Paragraph>
      </InformationContainer>
    );
  }

  const mood = moreVisibleEmotion(detection.expressions);
  const age = detection.age.toFixed(0);

  return (
    <InformationContainer>
      <TitleContainer>
        <TitleStyle title={"first"}>
          <Paragraph fontSize={64} fontWeight={300}>
            <ThinText>my</ThinText> prediction
          </Paragraph>
        </TitleStyle>
        <TitleStyle title={"second"}>
          <Paragraph fontSize={48} fontWeight={300} color={"greenLight"}>
            <ThinText>based on</ThinText> your <ThinText>face</ThinText>
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

const InformationContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: 580,
  gap: 60,
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
        marginTop: -14,
        marginLeft: 43,
      },
    },
  },
});

const ThinText = styled("span", { fontWeight: 100 });
