/** @jsx jsx */
import { jsx } from "@emotion/core";

import React, { useState } from "react";
import { weirdCourseNames } from "./constants";
import Section from "./Section";
import { ISection } from "./App";

interface Props {
  name: string;
  deptCourseId: string;
  sections: Array<ISection>;
}

const styles = {
  Course: {
    padding: "10px",
    fontSize: "1.2rem",
    display: "flex",
    flexDirection: "column" as "column"
  },
  row: {
    display: "flex",
    width: "80vw"
  },
  id: {
    width: "10%",
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center"
  },
  name: {
    width: "70%"
  }
};

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
      {showSections && (
        <ul>
          {sections.map(section => (
            <Section instructor={section.instructor} status={section.status} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Course;
