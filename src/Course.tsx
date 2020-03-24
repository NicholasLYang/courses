/** @jsx jsx */
import { jsx } from "@emotion/core";

import React, { MouseEvent } from "react";
import { findCoreReqs, fixCourseName } from "./utils";
import { Link } from "react-router-dom";

interface Props {
  active?: boolean;
  schoolCode: string;
  subjectCode: string;
  name: string;
  deptCourseId: string;
  year: string;
  season: string;
  isOdd: boolean;
  handleClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

const styles = {
  Course: (isOdd: boolean, active?: boolean) => {
    let backgroundColor = isOdd ? "#dfdfdf" : "#fefefe";
    if (active) {
      backgroundColor = "rgba(137,0,225,0.45)";
    }
    return {
      fontSize: "1.2rem",
      display: "flex",
      backgroundColor,
      padding: "10px",
      transition: "0.1s background-color",
      textDecoration: "none",
      color: "black",
      "@media(max-width: 1000px)": {
        maxWidth: "70vw"
      },
      "&:hover": {
        backgroundColor: "rgba(137,0,225,0.45)"
      }
    };
  },
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
  active,
  schoolCode,
  subjectCode,
  name,
  deptCourseId,
  year,
  season,
  isOdd,
  handleClick
}) => {
  const isCoreReq = findCoreReqs(schoolCode, subjectCode, deptCourseId);
  return (
    <Link
      to={`/${year}/${season}/${schoolCode}/${subjectCode}/${deptCourseId}`}
      onClick={handleClick}
      key={name}
      css={styles.Course(isOdd, active)}
    >
      <div css={styles.id}>{deptCourseId}</div>
      <div css={styles.name}>{fixCourseName(name)}</div>
      {isCoreReq && <div css={styles.core}> Major Req </div>}
    </Link>
  );
};

export default Course;
