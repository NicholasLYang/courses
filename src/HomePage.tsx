/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Link } from "react-router-dom";
import React from "react";

const styles = {
  HomePage: {
    display: "flex",
    flexDirection: "column",
    height: "90vh",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: "1.5em"
  },
  links: {
    display: "flex",
    justifyContent: "space-evenly",
    height: "350px",
    flexWrap: "wrap"
  },
  link: (color: string) => ({
    width: "200px",
    height: "150px",
    margin: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textDecoration: "none",
    backgroundColor: color,
    "&:hover": {
      textDecoration: "underline"
    }
  })
} as const;

const HomePage: React.FC = () => {
  return (
    <div css={styles.HomePage}>
      <div css={{ fontSize: "1.5em" }}>
        <h1> Courses </h1>
      </div>
      <div css={styles.links}>
        <Link css={styles.link("#809848")} to={`/2020/sp`}>
          <h2> Spring 2020</h2>
        </Link>
        <Link css={styles.link("#e08e45")} to={`/2020/fa`}>
          <h2>Fall 2020</h2>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
