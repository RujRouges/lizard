import { css, styled } from "../../shared/style/stitches.config";
import { Title } from "../../shared/components/typography";
import { Button } from "../../shared/components/button";
import { WebcamComponent } from "./WebcamComponent";

export const HomePage = () => {
  return (
    <Flex>
      <Title>Ti leggo la faccia</Title>
      <WebcamComponent />
      <Button>Scatta</Button>
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
  gap: 24,
});
