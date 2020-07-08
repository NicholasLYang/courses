/** @jsx jsx */
import { jsx } from "@emotion/core";

import React from "react";
import { IRequirement } from "./types";
import Requirement from "./Requirement";

interface Props {
  requirements: IRequirement[];
}

const MajorRequirements: React.FC<Props> = ({ requirements }) => {
  return (
    <div>
      <h3> Major Requirements </h3>
      <div css={{ padding: "0px 20px 0px 20px" }}>
        {requirements.map(req => (
          <Requirement req={req} />
        ))}
      </div>
    </div>
  );
};

export default MajorRequirements;
