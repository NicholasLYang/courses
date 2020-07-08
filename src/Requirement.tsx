/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";

import { IRequirement, RequirementType } from "./types";

interface Props {
  req: IRequirement;
}

const Requirement: React.FC<Props> = ({ req }) => {
  if (req.type === RequirementType.One) {
    return (
      <div
        css={{
          padding: "20px",
          width: "250px",
          height: "50px"
        }}
      >
        <span>{req.code}: </span>
        <span> {req.name}</span>
      </div>
    );
  } else if (req.type === RequirementType.And) {
    return (
      <div
        css={{
          display: "flex",
          border: "1px solid #AA4465",
          borderRadius: "15px"
        }}
      >
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
      <div
        css={{
          display: "flex",
          padding: "20px",
          width: `${req.args.length * 300}px`
        }}
      >
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
