import { globalCss } from "@stitches/react";
import { normalize, opinionated } from "stitches-normalize-css";
import { HomePage } from "./components/homepage";

const globalStyles = globalCss(...normalize, ...opinionated, {
  body: {
    fontFamily: "$default",
    margin: "none",
  },
});

const App = () => {
  globalStyles();

  return <HomePage />;
};

export default App;
