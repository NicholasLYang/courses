/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { RootState } from "./duck";
import { useSelector } from "react-redux";
import SubwayDoor from "./SubwayDoor";
import { LoadingState } from "./types";

const styles = {
  width: "40vw",
  padding: "20px",
  height: "80vh",
  overflow: "scroll",
  boxShadow: "0px 4px 22px -6px rgba(0,0,0,0.75)"
};

const View: React.FC = ({ children }) => {
  const loadingState = useSelector(
    (state: RootState) => state.core.loadingState
  );
  if (loadingState === LoadingState.Loading) {
    return (
      <div css={styles}>
        <h2> Loading...</h2>
        <div css={{ display: "flex" }}>
          <SubwayDoor side="left" />
          <SubwayDoor side="right" />
        </div>
      </div>
    );
  }
  return <div css={styles}>{children}</div>;
};

export default View;
