/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import AnimatedSubwayLine from "./AnimatedSubwayLine";
import { Link } from "react-router-dom";

const styles = {
  HomePage: {
    display: "flex",
    flexDirection: "column",
    height: "90vh",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: "1.5em"
  },
  season: {
    display: "flex",
    height: "80vh",
    alignItems: "flex-end",
    position: "relative"
  },
  seasonName: {
    position: "absolute",
    left: "-50px",
    height: "80vh",
    width: "200px",
    display: "flex",
    alignItems: "center",
    zIndex: 100
  }
} as const;

const HomePage: React.FC = () => {
  return (
    <div css={styles.HomePage}>
      <div css={{ fontSize: "1.5em" }}>
        <h1> Courses </h1>
      </div>
      <div
        css={{ display: "flex", width: "80vw", justifyContent: "space-around" }}
      >
        <Link to="/2020/sp" css={styles.season}>
          <h1 css={styles.seasonName}> Spring 2020 </h1>
          <AnimatedSubwayLine color={"#e08e45"} />
        </Link>
        <Link to="/2020/fa" css={styles.season}>
          <AnimatedSubwayLine
            css={{ position: "absolute", left: "0", top: "0" }}
            color={"#809848"}
          />
          <h1 css={styles.seasonName}> Fall 2020 </h1>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
