/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";

const styles = {
  width: "40vw",
  padding: "20px",
  height: "80vh",
  margin: "20px",
  overflow: "scroll",
  boxShadow: "0px 4px 22px -6px rgba(0,0,0,0.75)",
  "@media(max-width: 700px)": {
    width: "80vw",
    boxShadow: "none",
    overflow: "visible",
    margin: "0px",
    paddingBottom: "20px"
  }
};

const View: React.FC = ({ children }) => {
  return <div css={styles}>{children}</div>;
};

export default View;
