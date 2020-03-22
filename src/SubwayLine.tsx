/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import SubwayStop from "./SubwayStop";
import { STOPS_COUNT } from "./constants";

interface Props {
  color: string;
  lineStep: number;
  stopOffsets: number[];
  lineOffset: number;
  currentStop: number;
}

const styles = {
  SubwayLine: (lineStep: number, color: string) =>
    ({
      width: "15px",
      height: `${lineStep * (80 / STOPS_COUNT)}vh`,
      transition: "height 1s",
      margin: "10px 0px 10px 0px",
      borderRadius: "10%",
      position: "relative",
      backgroundColor: color
    } as const)
};

const SubwayLine: React.FunctionComponent<Props> = ({
  currentStop,
  stopOffsets,
  lineStep,
  color
}) => {
  let subwayStops = [];
  // Wow I think this is my first traditional for loop in JS in ages
  for (let i = 0; i < STOPS_COUNT; i++) {
    subwayStops.push(
      <SubwayStop
        key={i}
        stopIndex={i}
        currentStop={currentStop}
        offset={stopOffsets[i]}
      />
    );
  }
  return <div css={styles.SubwayLine(lineStep, color)}>{subwayStops}</div>;
};

export default SubwayLine;
