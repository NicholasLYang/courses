/** @jsx jsx */
import { jsx } from "@emotion/core";

import RequirementsChain from "./RequirementsChain";
import { CURRENT_SEASON, CURRENT_YEAR, requirements } from "./constants";

// Allows for major requirements to be compared
const CompSciRequirementsPage = () => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      <RequirementsChain
        name="CAS Computer Science"
        requirements={requirements["ua-csci"]}
      />
      <RequirementsChain
        name="Tandon Computer Science"
        requirements={requirements["uy-cs"]}
      />
    </div>
  );
};

export default CompSciRequirementsPage;
