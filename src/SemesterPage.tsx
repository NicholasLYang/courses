/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Link, useParams } from "react-router-dom";
import { RootState } from "./duck";
import { useSelector } from "react-redux";
import React from "react";

/*
  semester page to allow user to switch between semesters.
  Making request to the API
*/
const SemesterPage: React.FC = () => {
  const { year, season } = useParams();
  const schools = useSelector((state: RootState) => state.core.schools);
  return (
    <div>
      <Link to="/"> &#8592; Switch semester</Link>
      <ul
        css={{ display: "flex", flexDirection: "column", lineHeight: "1.5em" }}
      >
        {Object.entries(schools).map(([code, name]) => (
          <Link key={code} to={`/${year}/${season}/${code}`}>
            {name.name}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SemesterPage;
