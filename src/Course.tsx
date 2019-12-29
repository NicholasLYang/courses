/** @jsx jsx */
import { jsx } from "@emotion/core";

import React from "react";
import { weirdCourseNames } from "./constants";

interface Props {
  name: string;
  deptCourseId: string;
}

const Course: React.FC<Props> = ({ name, deptCourseId }) => {
  return (
    <div
      key={name}
      css={{
        padding: "10px",
        fontSize: "1.2rem",
        width: "80vw",
        display: "flex"
      }}
    >
      <div
        css={{
          width: "10%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {deptCourseId}
      </div>
      <div
        css={{
          width: "70%"
        }}
      >
        {name in weirdCourseNames ? weirdCourseNames[name] : name}
      </div>
    </div>
  );
};

export default Course;
