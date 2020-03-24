/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { useEffect } from "react";
import { getCourses, RootState } from "./duck";
import { useDispatch, useSelector } from "react-redux";
import SectionsList from "./SectionsList";
import { LoadingState } from "./types";
import { fixCourseName } from "./utils";
import View from "./View";

interface Props {
  subjectCode: string;
  schoolCode: string;
  courseCode: string;
  year: string;
  season: string;
}

const CourseView: React.FC<Props> = ({
  subjectCode,
  schoolCode,
  courseCode,
  year,
  season
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourses(year!, season!, schoolCode!, subjectCode!));
  }, [subjectCode, schoolCode, season, year, dispatch]);
  const course = useSelector(
    (state: RootState) =>
      state.core.courses[`${year}-${season}-${subjectCode}-${schoolCode}`]?.[
        courseCode!
      ]
  );
  const loadingState = useSelector(
    (state: RootState) => state.core.loadingState
  );
  const error = useSelector((state: RootState) => state.core.error);
  if (loadingState === LoadingState.Loading || course === undefined) {
    return <h2> Loading...</h2>;
  }
  if (loadingState === LoadingState.Failed) {
    return <div css={{ color: "red" }}> {error} </div>;
  }
  const allDescriptionsEqual = course.sections.every(
    section => section.description === course.sections[0].description
  );
  const allNotesEqual = course.sections.every(
    section => section.notes === course.sections[0].notes
  );
  return (
    <View>
      <div
        css={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <h1>{fixCourseName(course.name)} </h1>
        {allDescriptionsEqual && <p>{course.sections[0].description}</p>}
        <h2> Sections </h2>
        <SectionsList
          sections={course.sections}
          displayDescription={!allDescriptionsEqual}
          displayNotes={!allNotesEqual}
        />
      </div>
    </View>
  );
};

export default CourseView;
