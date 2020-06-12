/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Link } from "react-router-dom";
import { getSchools, RootState } from "./duck";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import View from "./View";
import { getOrKey } from "./utils";
import { seasons } from "./constants";
import { LoadingState } from "./types";

interface Props {
  year: string;
  season: string;
}

const SemesterView: React.FC<Props> = ({ year, season }) => {
  const dispatch = useDispatch();
  const loadingState = useSelector(
    (state: RootState) => state.core.schools.loadingState
  );
  const error = useSelector((state: RootState) => state.core.schools.error);
  useEffect(() => {
    dispatch(getSchools());
  }, [dispatch]);
  const schools = Object.entries(
    useSelector((state: RootState) => state.core.schools.entities)
  );
  const undergradSchools = schools.filter(([code]) => code[0] !== "G");
  const gradSchools = schools.filter(([code]) => code[0] === "G");

  if (loadingState === LoadingState.Loading) {
    return (
      <View>
        {" "}
        <h2> Loading...</h2>
      </View>
    );
  }
  if (error) {
    return (
      <View>
        <h1> {`${year} ${getOrKey(season, seasons)}`}</h1>
        <div css={{ color: "red" }}> {error.toString()}</div>
      </View>
    );
  }
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
