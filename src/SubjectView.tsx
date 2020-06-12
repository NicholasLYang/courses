/** @jsx jsx */
import { jsx } from "@emotion/core";

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { fixSubjectName } from "./utils";
import { SubjectCourseList } from "./SubjectCourseList";
import { useDispatch, useSelector } from "react-redux";
import { getSubjects, RootState } from "./duck";
import { LoadingState } from "./types";
import View from "./View";
import { requirements } from "./constants";
import MajorRequirements from "./MajorRequirements";

interface Props {
  subjectCode: string;
  schoolCode: string;
  year: string;
  season: string;
  shouldDisplayBack: boolean;
}

const SubjectView: React.FC<Props> = ({
  subjectCode,
  schoolCode,
  year,
  season,
  shouldDisplayBack
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubjects(schoolCode));
  }, [dispatch, schoolCode]);
  const loadingState = useSelector(
    (state: RootState) => state.core.subjects.loadingState
  );
  const error = useSelector((state: RootState) => state.core.subjects.error);
  const subject = useSelector(
    (state: RootState) =>
      state.core.subjects?.entities[schoolCode!]?.[subjectCode!]
  );
  if (subject === undefined) {
    return (
      <View>
        <h2> Loading...</h2>
      </View>
    );
  }
  if (loadingState === LoadingState.Failed) {
    return <div css={{ color: "red" }}> {error} </div>;
  }

  const majorReqsKey = `${year}-${season}-${subjectCode}`.toLowerCase();

  return (
    <View>
      {shouldDisplayBack && (
        <Link to={`/${year}/${season}/${schoolCode}`}>
          &#8592; Switch subject
        </Link>
      )}
      <h2> {fixSubjectName(subject.name, subjectCode)} </h2>
      {majorReqsKey in requirements && (
        <MajorRequirements
          year={year}
          season={season}
          subjectCode={subjectCode}
          schoolCode={schoolCode}
          requirements={requirements[majorReqsKey]}
        />
      )}
      <header>
        <h3> Courses </h3>
      </header>
      <SubjectCourseList
        year={year}
        season={season}
        subjectCode={subjectCode}
        schoolCode={schoolCode}
      />
    </View>
  );
};

export default SubjectView;
