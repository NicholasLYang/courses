/** @jsx jsx */
import { jsx } from "@emotion/core";

import React, { useState } from "react";
import { weirdCourseNames } from "./constants";
import SectionsList from "./SectionsList";
import { ISection } from "./types";
import { findCoreReqs, getOrKey } from "./utils";

interface Props {
  schoolCode: string;
  subjectCode: string;
  name: string;
  deptCourseId: string;
  sections: Array<ISection>;
  isOdd: boolean;
}

const styles = {
  Course: {
    fontSize: "1.2rem",
    display: "flex",
    flexDirection: "column"
  },
  row: (isOdd: boolean) => ({
    display: "flex",
    padding: "10px",
    maxWidth: "50vw",
    transition: "0.1s background-color",
    "@media(max-width: 1000px)": {
      maxWidth: "70vw"
    },
    backgroundColor: isOdd ? "#dfdfdf" : "white",
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
  sections,
  isOdd
}) => {
  const isCoreReq = findCoreReqs(schoolCode, subjectCode, deptCourseId);
  const [showSections, setShowSections] = useState(false);
  return (
    <div key={name} css={styles.Course}>
      <div
        css={styles.row(isOdd)}
        onClick={() => setShowSections(!showSections)}
      >
        <div css={styles.id}>{deptCourseId}</div>
        <div css={styles.name}>{getOrKey(name, weirdCourseNames)}</div>
        {isCoreReq && <div css={styles.core}> Core </div>}
      </div>
      {showSections && <SectionsList sections={sections} />}
    </div>
  );
};

export default Course;
