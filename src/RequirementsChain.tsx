/** @jsx jsx */
import { jsx } from "@emotion/core";

import React from "react";
import { IRequirement } from "./types";
import Requirement from "./Requirement";

interface Props {
  requirements: Array<IRequirement>;
  name: string;
}

const RequirementsChain: React.FC<Props> = ({ requirements, name }) => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        height: "750px"
      }}
    >
      <h1> {name} </h1>
      {requirements.map(req => (
        <Requirement req={req} />
      ))}
    </div>
  );
};

export default RequirementsChain;
