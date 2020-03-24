/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
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
  season: (backgroundColor: string) => ({
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    backgroundColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    color: "black",
    fontFamily: "Helvetica"
  }),
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
        <Link to="/2020/sp" css={styles.season("#809848")}>
          <h2 css={{ fontSize: "2.5em" }}> Spring </h2>
        </Link>
        <Link to="/2020/fa" css={styles.season("#e08e45")}>
          <h2 css={{ fontSize: "2.5em" }}> Fall </h2>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
