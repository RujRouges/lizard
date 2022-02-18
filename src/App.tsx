import { globalCss } from "@stitches/react";
import { Toaster } from "react-hot-toast";
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

  return (
    <>
      <FaceScan />
      <Toaster containerStyle={{ margin: "40px 40px 0 0" }} />
    </>
  );
};

export default App;
