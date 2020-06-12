/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { IRequirement, RequirementType } from "./types";
import CourseLink from "./CourseLink";
import { CURRENT_SEASON, CURRENT_YEAR } from "./constants";

interface Props {
  req: IRequirement;
}

const Requirement: React.FC<Props> = ({ req }) => {
  if (req.type === RequirementType.One) {
    const [subjectCode, schoolCode, deptCourseId] = req.name.split("-");

    return (
      <div
        css={{
          padding: "20px",
          border: "1px solid #AA4465",
          borderRadius: "15px",
          margin: "20px"
        }}
      >
        <CourseLink
          year={CURRENT_YEAR}
          season={CURRENT_SEASON}
          subjectCode={subjectCode}
          schoolCode={schoolCode}
          deptCourseId={deptCourseId}
          name={req.name}
        />
      </div>
    );
  } else if (req.type === RequirementType.And) {
    return (
      <div>
        <span> All of:</span>
        {req.args.map(r => (
          <Requirement req={r} />
        ))}
      </div>
    );
  } else if (req.type === RequirementType.Or) {
    return (
      <div>
        <span> One of:</span>
        {req.args.map(r => (
          <Requirement req={r} />
        ))}
      </div>
    );
  } else if (req.type === RequirementType.Choose) {
    return (
      <div>
        <span> {req.num} of:</span>
        {req.args.map(r => (
          <Requirement req={r} />
        ))}
      </div>
    );
  } else {
    return <div> Unreachable! There's a bug in this code </div>;
  }
};

export default Requirement;
