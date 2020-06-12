/** @jsx jsx */
import { jsx } from "@emotion/core";

import React from "react";
import { IRequirement, LoadingState, Op } from "./types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./duck";
import { fixCourseName } from "./utils";

interface Props {
  year: string;
  season: string;
  subjectCode: string;
  schoolCode: string;
  requirements: IRequirement;
}

const styles = {
  reqBlock: {
    padding: "10px 0px 10px 0px"
  }
};

const MajorRequirements: React.FC<Props> = ({
  requirements,
  year,
  season,
  subjectCode,
  schoolCode
}) => {
  const courses = useSelector(
    (state: RootState) =>
      state.core.courses.entities[
        `${year}-${season}-${subjectCode}-${schoolCode}`
      ]
  );
  const loadingState = useSelector(
    (state: RootState) => state.core.courses.loadingState
  );
  if (loadingState === LoadingState.Loading) {
    return null;
  }
  function stringToCourse(str: string) {
    const [subjectCode, schoolCode, deptCourseId] = str.split("-");
    return (
      <Link
        to={`/${year}/${season}/${schoolCode}/${subjectCode}/${deptCourseId}`}
        css={{ padding: "5px" }}
      >
        {fixCourseName(courses[deptCourseId].name)}
      </Link>
    );
  }
  function displayRequirements(req: IRequirement) {
    const argsComponents = req.args.flatMap(arg =>
      typeof arg === "string" ? [stringToCourse(arg)] : displayRequirements(arg)
    );
    if (req.op === Op.And) {
      return <div css={styles.reqBlock}> ALL of: {argsComponents} </div>;
    }
    if (req.op === Op.Or) {
      return (
        <div css={styles.reqBlock}> AT LEAST ONE of: {argsComponents} </div>
      );
    }
    if (req.op === Op.Choose) {
      return (
        <div css={styles.reqBlock}>
          {" "}
          AT LEAST {req.num} of: {argsComponents}{" "}
        </div>
      );
    }
  }
  return (
    <div>
      <h3> Major Requirements </h3>
      <div css={{ padding: "0px 20px 0px 20px" }}>
        {displayRequirements(requirements)}
      </div>
    </div>
  );
};

export default MajorRequirements;
