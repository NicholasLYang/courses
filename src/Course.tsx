/** @jsx jsx */
import { jsx } from "@emotion/core";

import React from "react";
import { weirdCourseNames } from "./constants";
import { findCoreReqs, getOrKey } from "./utils";
import { Link } from "react-router-dom";

interface Props {
  schoolCode: string;
  subjectCode: string;
  name: string;
  deptCourseId: string;
  year: string;
  season: string;
  isOdd: boolean;
}

const styles = {
  Course: (isOdd: boolean) => ({
    fontSize: "1.2rem",
    display: "flex",
    backgroundColor: isOdd ? "#dfdfdf" : "#fefefe",
    padding: "10px",
    maxWidth: "50vw",
    transition: "0.1s background-color",
    textDecoration: "none",
    color: "black",
    "@media(max-width: 1000px)": {
      maxWidth: "70vw"
    },
    "&:hover": {
      backgroundColor: "rgba(137,0,225,0.45)"
    }
  }),
  id: {
    width: "10%",
    minWidth: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  core: {
    color: "red"
  },
  name: {
    width: "70%"
  }
} as const;

const Course: React.FC<Props> = ({
  schoolCode,
  subjectCode,
  name,
  deptCourseId,
  year,
  season,
  isOdd
}) => {
  const isCoreReq = findCoreReqs(schoolCode, subjectCode, deptCourseId);
  return (
    <Link
      to={`/${year}/${season}/${schoolCode}/${subjectCode}/${deptCourseId}`}
      key={name}
      css={styles.Course(isOdd)}
    >
      <div css={styles.id}>{deptCourseId}</div>
      <div css={styles.name}>{getOrKey(name, weirdCourseNames)}</div>
      {isCoreReq && <div css={styles.core}> Core </div>}
    </Link>
  );
};

export default Course;
