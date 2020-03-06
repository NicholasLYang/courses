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
    <div>
      <Link to="/"> &#8592; Switch semester</Link>
      <ul
        css={{ display: "flex", flexDirection: "column", lineHeight: "1.5em" }}
      >
        {Object.entries(schools).map(([code, school]) => (
          <Link key={code} to={`/${semester}/${code}`}>
            {school.name}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SemesterPage;
