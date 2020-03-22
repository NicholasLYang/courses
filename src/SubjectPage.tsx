/** @jsx jsx */
import { jsx } from "@emotion/core";

import React, { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { fixSubjectName } from "./utils";
import { SubjectCourseList } from "./SubjectCourseList";
import { useDispatch, useSelector } from "react-redux";
import { getSubjects, RootState } from "./duck";
import { LoadingState } from "./types";

const styles = {
  SubjectPage: {
    display: "flex",
    flexDirection: "column"
  }
} as const;

const SubjectPage: React.FC = () => {
  const { subjectCode, schoolCode, year, season } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubjects(schoolCode));
  }, [dispatch, schoolCode]);
  const loadingState = useSelector(
    (state: RootState) => state.core.loadingState
  );
  const error = useSelector((state: RootState) => state.core.error);
  const subject = useSelector(
    (state: RootState) => state.core.subjects?.[schoolCode!]?.[subjectCode!]
  );
  if (loadingState === LoadingState.Loading || subject === undefined) {
    return <h2> Loading...</h2>;
  }
  if (loadingState === LoadingState.Failed) {
    return <div css={{ color: "red" }}> {error} </div>;
  }
  if (
    subjectCode === undefined ||
    schoolCode === undefined ||
    year === undefined ||
    season === undefined
  ) {
    history.push("/");
    return (
      <div>
        No subject selected! Please go <Link to="/"> back</Link>
      </div>
    );
  }

  return (
    <div css={styles.SubjectPage}>
      <Link to={`/${year}/${season}/${schoolCode}`}>
        &#8592; Switch subject
      </Link>
      <h2> {fixSubjectName(subject.name, subjectCode)} </h2>
      <header>
        <h3> Courses </h3>
      </header>
      <SubjectCourseList
        year={year}
        season={season}
        subjectCode={subjectCode}
        schoolCode={schoolCode}
      />
    </div>
  );
};

export default SubjectPage;
