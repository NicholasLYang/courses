/** @jsx jsx */
import { jsx } from "@emotion/core";

import React from "react";

interface Props {
  instructor: string;
  status: string;
}

function getStatusColor(status: string): string {
  switch (status) {
    case "WaitList":
      return "orange";
    case "Open":
      return "green";
    case "Closed":
      return "red";
    default:
      return "black";
  }
}

const Section: React.FC<Props> = ({ instructor, status }) => {
  return (
    <div>
      {instructor} <div css={{ color: getStatusColor(status) }}> {status} </div>
    </div>
  );
};

export default Section;
