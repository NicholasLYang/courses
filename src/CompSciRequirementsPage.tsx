/** @jsx jsx */
import { jsx } from "@emotion/core";

import RequirementsChain from "./RequirementsChain";
import { requirements } from "./constants";

// Allows for major requirements to be compared
const CompSciRequirementsPage = () => {
  return (
    <div
      css={{
        display: "flex",
        width: "50vw",
        maxWidth: "600px",
        justifyContent: "space-around"
      }}
    >
      <RequirementsChain
        name="CAS Computer Science"
        requirements={requirements["2020-fa-ua-csci"]}
      />
      <RequirementsChain
        name="Tandon Computer Science"
        requirements={requirements["2020-fa-uy-cs"]}
      />
    </div>
  );
};

export default CompSciRequirementsPage;
