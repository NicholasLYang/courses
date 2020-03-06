/** @jsx jsx */
import { jsx } from "@emotion/core";

import React, { useState } from "react";
import { weirdCourseNames } from "./constants";
import SectionsList from "./SectionsList";
import { ISection } from "./types";

interface Props {
  name: string;
  deptCourseId: string;
  sections: Array<ISection>;
}

const styles = {
  Course: {
    fontSize: "1.2rem",
    display: "flex",
    flexDirection: "column"
  },
  row: {
    display: "flex",
    padding: "10px",
    maxWidth: "50vw",
    transition: "0.1s background-color",
    "@media(max-width: 1000px)": {
      maxWidth: "70vw"
    },
    "&:hover": {
      backgroundColor: "#b9b9b9"
    }
  },
  id: {
    width: "10%",
    minWidth: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  name: {
    width: "70%"
  }
} as const;

const Course: React.FC<Props> = ({ name, deptCourseId, sections }) => {
  const [showSections, setShowSections] = useState(false);
  return (
    <div key={name} css={styles.Course}>
      <div css={styles.row} onClick={() => setShowSections(!showSections)}>
        <div css={styles.id}>{deptCourseId}</div>
        <div css={styles.name}>
          {name in weirdCourseNames ? weirdCourseNames[name] : name}
        </div>
      </div>
      {showSections && <SectionsList sections={sections} />}
    </div>
  );
};

export default Course;
