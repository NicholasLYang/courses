/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { LoadingState } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { getSubjects, RootState } from "./duck";
import { getOrKey } from "./utils";
import { weirdSubjectNames } from "./constants";

interface Props {
  schoolCode: string;
  year: string;
  season: string;
}

const SchoolSubjectsList: React.FC<Props> = ({ schoolCode, year, season }) => {
  const dispatch = useDispatch();
  const loadingState = useSelector(
    (state: RootState) => state.core.loadingState
  );
  useEffect(() => {
    dispatch(getSubjects(schoolCode));
  }, [dispatch, schoolCode]);
  const error = useSelector((state: RootState) => state.core.error);
  const subjects = useSelector(
    (state: RootState) => state.core.subjects[schoolCode]
  );
  if (loadingState === LoadingState.Loading || subjects === undefined) {
    return <h2> Loading...</h2>;
  }
  if (loadingState === LoadingState.Failed) {
    return <div css={{ color: "red" }}> {error} </div>;
  }
  console.log(Object.entries(subjects));
  return (
    <div>
      <Link to={`/${year}/${season}`}> &#8592; Switch school</Link>
      <ul
        css={{ display: "flex", flexDirection: "column", lineHeight: "1.5em" }}
      >
        {Object.entries(subjects)
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([code, name]) => (
            <Link key={code} to={`/${year}/${season}/${schoolCode}/${code}`}>
              {getOrKey(name, weirdSubjectNames)}
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default SchoolSubjectsList;
