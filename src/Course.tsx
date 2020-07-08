/** @jsx jsx */
import { jsx } from "@emotion/core";

import React, { MouseEvent } from "react";
import { fixCourseName } from "./utils";
import { Link } from "react-router-dom";
import { ISection } from "./types";

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
  sections: ISection[];
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
      alignItems: "center",
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
    alignItems: "center",
    padding: "5px"
  },
  core: {
    color: "red",
    width: "50px"
  },
  name: {
    width: "200px"
  },
  inPerson: {
    borderRadius: "50%",
    width: "10px",
    height: "10px",
    backgroundColor: "#ff0099",
    margin: "10px"
  },
  blended: {
    borderRadius: "50%",
    width: "10px",
    height: "10px",
    backgroundColor: "#7d7dff",
    margin: "10px"
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
  handleClick,
  sections
}) => {
  const hasInPerson = sections.some(
    section => section.instructionMode === "In-Person"
  );
  const hasBlended = sections.some(
    section => section.instructionMode === "Blended (Online & In-Person)"
  );
  return (
    <Link
      to={`/${year}/${season}/${schoolCode}/${subjectCode}/${deptCourseId}`}
      onClick={handleClick}
      key={name}
      css={styles.Course(isOdd, active)}
    >
      <div css={styles.id}>{deptCourseId}</div>
      <div css={styles.name}>{fixCourseName(name)}</div>
      {hasInPerson && <div css={styles.inPerson}> </div>}
      {hasBlended && <div css={styles.blended}> </div>}
    </Link>
  );
};

export default Course;
