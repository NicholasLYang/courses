/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Link, useParams } from "react-router-dom";
import { RootState } from "./duck";
import { useSelector } from "react-redux";
import React from "react";

const SemesterPage: React.FC = () => {
  const { semester } = useParams();
  const schools = useSelector((state: RootState) => state.core.schools);
  return (
    <ul css={{ display: "flex", flexDirection: "column", lineHeight: "1.5em" }}>
      {Object.entries(schools).map(([code, name]) => (
        <Link key={code} to={`/${semester}/${code}`}>
          {name}
        </Link>
      ))}
    </ul>
  );
};

export default SemesterPage;
