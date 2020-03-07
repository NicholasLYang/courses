/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ISchool, LoadingState } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { getSubjects, RootState } from "./duck";
import { getOrKey } from "./utils";
import { weirdSubjectNames } from "./constants";

interface Props {
  school: ISchool;
  year: string;
  season: string;
}

const SchoolSubjectsList: React.FC<Props> = ({ school, year, season }) => {
  const dispatch = useDispatch();
  const loadingState = useSelector(
    (state: RootState) => state.core.loadingState
  );
  useEffect(() => {
    dispatch(getSubjects(school.code));
  }, [dispatch, school.code]);
  const error = useSelector((state: RootState) => state.core.error);
  if (loadingState === LoadingState.Loading) {
    return <h2> Loading...</h2>;
  }
  if (loadingState === LoadingState.Failed) {
    return <div css={{ color: "red" }}> {error} </div>;
  }
  const subjects = Object.entries(school.subjects);
  return (
    <div>
      <Link to={`/${year}/${season}`}> &#8592; Switch school</Link>
      <ul
        css={{ display: "flex", flexDirection: "column", lineHeight: "1.5em" }}
      >
        {subjects
          .sort((a, b) => a[1].name.localeCompare(b[1].name))
          .map(([subject, { name }]) => (
            <Link
              key={subject}
              to={`/${year}/${season}/${school.code}/${subject}`}
            >
              {getOrKey(name, weirdSubjectNames)}
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default SchoolSubjectsList;
