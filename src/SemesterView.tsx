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
  const schools = useSelector(
    (state: RootState) => state.core.schools.entities
  );
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
    </View>
  );
};

export default SemesterView;
