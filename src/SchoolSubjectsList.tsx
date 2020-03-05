/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getOrKey } from "./utils";
import { subjectNames } from "./constants";
import { ISchool, LoadingState } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { getSubjects, RootState } from "./duck";

interface Props {
  code: string;
  school: ISchool;
  semester: string;
}

const SchoolSubjectsList: React.FC<Props> = ({ code, school, semester }) => {
  const dispatch = useDispatch();
  const loadingState = useSelector(
    (state: RootState) => state.core.loadingState
  );
  useEffect(() => {
    dispatch(getSubjects(code));
  }, [dispatch, code]);
  const error = useSelector((state: RootState) => state.core.error);
  if (loadingState === LoadingState.Loading) {
    return <h2> Loading...</h2>;
  }
  if (loadingState === LoadingState.Failed) {
    return <div css={{ color: "red" }}> {error} </div>;
  }
  const subjects = Object.entries(school.subjects);
  return (
    <div
      css={{ display: "flex", flexDirection: "column", lineHeight: "1.5em" }}
    >
      {subjects
        .sort((a, b) => a[1].name.localeCompare(b[1].name))
        .map(([subject]) => (
          <Link key={subject} to={`/${semester}/${school.code}/${subject}`}>
            {getOrKey(subject.toLowerCase(), subjectNames)}
          </Link>
        ))}
    </div>
  );
};

export default SchoolSubjectsList;
