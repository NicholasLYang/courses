/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Link, useParams } from "react-router-dom";
import { RootState } from "./duck";
import { useSelector } from "react-redux";
import React from "react";

const SemesterPage: React.FC = () => {
  const { year, season } = useParams();
  const schools = useSelector((state: RootState) => state.core.schools);
  return (
    <div>
      <div
        css={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Link css={{ padding: "5px" }} to="/">
          {" "}
          &#8592; Switch semester
        </Link>
        <Link
          css={{ padding: "5px", textDecoration: "none" }}
          to={`/${year}/${season}/search`}
        >
          <h2> Search (beta)</h2>
        </Link>
      </div>
      <ul
        css={{ display: "flex", flexDirection: "column", lineHeight: "1.5em" }}
      >
        {Object.entries(schools).map(([code, school]) => (
          <Link key={code} to={`/${year}/${season}/${code}`}>
            {school.name}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SemesterPage;
