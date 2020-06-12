/** @jsx jsx */
import { jsx } from "@emotion/core";

import React from "react";
import { IRequirement, LoadingState, RequirementType } from "./types";
import { useSelector } from "react-redux";
import { RootState } from "./duck";
import CourseLink from "./CourseLink";

interface Props {
  year: string;
  season: string;
  subjectCode: string;
  schoolCode: string;
  requirements: IRequirement[];
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

  function displayRequirements(req: IRequirement) {
    if (req.type === RequirementType.One) {
      const [subjectCode, schoolCode, deptCourseId] = req.name.split("-");

      return (
        <CourseLink
          year={year}
          season={season}
          subjectCode={subjectCode}
          schoolCode={schoolCode}
          deptCourseId={deptCourseId}
          name={courses[deptCourseId].name}
        />
      );
    }
    const argsComponents = req.args.map(arg => displayRequirements(arg));
    if (req.type === RequirementType.And) {
      return <div css={styles.reqBlock}> ALL of: {argsComponents} </div>;
    }
    if (req.type === RequirementType.Or) {
      return (
        <div css={styles.reqBlock}> AT LEAST ONE of: {argsComponents} </div>
      );
    }
    if (req.type === RequirementType.Choose) {
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
        {requirements.map(req => displayRequirements(req))}
      </div>
    </div>
  );
};

export default MajorRequirements;
