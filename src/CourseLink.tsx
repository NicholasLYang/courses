/** @jsx jsx */
import { jsx } from "@emotion/core";

import React from "react";
import { Link } from "react-router-dom";
import { fixCourseName } from "./utils";

interface Props {
  year: string;
  season: string;
  subjectCode: string;
  schoolCode: string;
  deptCourseId: string;
  name: string;
}

const CourseLink: React.FC<Props> = ({
  year,
  season,
  subjectCode,
  schoolCode,
  deptCourseId,
  name
}) => {
  return (
    <Link
      to={`/${year}/${season}/${schoolCode}/${subjectCode}/${deptCourseId}`}
      css={{ padding: "5px" }}
    >
      {fixCourseName(name)}
    </Link>
  );
};

export default CourseLink;
