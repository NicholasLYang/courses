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
  const test = Object.entries(schools)
  console.log(test)
  test.map(([code,name]) => (
    console.log(JSON.stringify(name).split(":")[1].split("}")[0])
  ))
  return (
    <div>
      <Link to="/"> &#8592; Switch semester</Link>
      <ul
        css={{ display: "flex", flexDirection: "column", lineHeight: "1.5em" }}
      >
        {Object.entries(schools).map(([code, name]) => (
          <Link key={code} to={`/${year}/${season}/${code}`}>
            {JSON.stringify(name).split(":")[1].split("}")[0].replace(/(['"])/g,'')}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SemesterPage;
