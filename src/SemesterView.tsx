/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Link, useParams } from "react-router-dom";
import { RootState } from "./duck";
import { useSelector } from "react-redux";
import React from "react";
import View from "./View";

interface Props {
  year: string;
  season: string;
}

const SemesterView: React.FC<Props> = ({ year, season }) => {
  const schools = Object.entries(
    useSelector((state: RootState) => state.core.schools)
  );
  const undergradSchools = schools.filter(([code]) => code[0] !== "G");
  const gradSchools = schools.filter(([code]) => code[0] === "G");

  return (
    <View>
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
          <h2> Search</h2>
        </Link>
      </div>
      <h3> Undergraduate </h3>
      <ul
        css={{ display: "flex", flexDirection: "column", lineHeight: "1.5em" }}
      >
        {undergradSchools.map(([code, school]) => (
          <Link key={code} to={`/${year}/${season}/${code}`}>
            {school.name}
          </Link>
        ))}
      </ul>
      <h3> Graduate </h3>
      <ul
        css={{ display: "flex", flexDirection: "column", lineHeight: "1.5em" }}
      >
        {gradSchools.map(([code, school]) => (
          <Link key={code} to={`/${year}/${season}/${code}`}>
            {school.name}
          </Link>
        ))}
      </ul>
    </View>
  );
};

export default SemesterView;
