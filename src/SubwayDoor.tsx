/** @jsx jsx */
import { jsx } from "@emotion/core";

import React from "react";
import { useSpring, animated } from "react-spring";

interface Props {
  side: "left" | "right";
}

function opposite(side: "left" | "right"): "left" | "right" {
  return side === "left" ? "right" : "left";
}

const SubwayDoor: React.FC<Props> = ({ side }) => {
  const props = useSpring({
    to: { transform: `translateX(0px)` },
    from: { transform: `translateX(${side === "left" ? "-" : ""}125px)` }
  });
  return (
    <animated.div
      css={{
        textDecoration: "none",
        color: "black",
        borderRadius: "10px",
        width: "222px",
        height: "440px",
        position: "relative",
        backgroundColor: "#efefef",
        "@media(max-width: 222px)": {
          width: "50vw"
        }
      }}
      style={props}
    >
      <div
        css={{
          top: "60px",
          [side]: "45px",
          position: "absolute",
          padding: "10px",
          border: "2px solid #e2e2e2",
          borderRadius: "25px",
          "@media(max-width: 222px)": {
            [side]: "6vw"
          }
        }}
      >
        <div
          css={{
            borderRadius: "20px",
            width: "105px",
            height: "180px",
            backgroundColor: "#85d9ef"
          }}
        />
      </div>
      <div
        css={{
          position: "absolute",
          width: "10px",
          height: "440px",
          [opposite(side)]: "0",
          backgroundColor: "black"
        }}
      />
    </animated.div>
  );
};

export default SubwayDoor;
