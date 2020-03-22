/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { STOPS_COUNT } from "./constants";

interface Props {
  currentStop: number;
  stopIndex: number;
  offset: number;
}

const styles = {
  SubwayStop: (currentStop: number, stopIndex: number, offset: number) =>
    ({
      backgroundColor: "white",
      position: "absolute",
      borderRadius: "50%",
      transition: "transform 0.75s",
      width: "25px",
      height: "25px",
      border: "0.5px solid #d9d9d9",
      left: "-6px",
      bottom: `${(stopIndex + 1) * (80 / STOPS_COUNT) - offset}vh`,
      transform: stopIndex < currentStop ? "scale(1)" : "scale(0)"
    } as const)
} as const;

const SubwayStop: React.FunctionComponent<Props> = ({
  currentStop,
  stopIndex,
  offset
}) => {
  return <div css={styles.SubwayStop(currentStop, stopIndex, offset)} />;
};

export default SubwayStop;
