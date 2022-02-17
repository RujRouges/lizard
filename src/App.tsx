import { globalCss } from "@stitches/react";
import { normalize, opinionated } from "stitches-normalize-css";
import { FaceScan } from "./components/FaceScan";

const globalStyles = globalCss(...normalize, ...opinionated, {
  body: {
    fontFamily: "$default",
    margin: "none",
  },
});

const App = () => {
  globalStyles();

  return <FaceScan />;
};

export default App;
