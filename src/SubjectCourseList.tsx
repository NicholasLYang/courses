/** @jsx jsx */
import { jsx } from "@emotion/core";

import React, { useEffect } from "react";
import { ICourse, LoadingState } from "./types";
import Course from "./Course";
import { useDispatch, useSelector } from "react-redux";
import { getCourses, RootState } from "./duck";

interface Props {
  subjectCode: string;
  schoolCode: string;
  year: string;
  season: string;
}

export const SubjectCourseList: React.FC<Props> = ({
  subjectCode,
  schoolCode,
  year,
  season
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourses(year, season, schoolCode, subjectCode));
  }, [subjectCode, schoolCode, season, year, dispatch]);
  const loadingState = useSelector(
    (state: RootState) => state.core.loadingState
  );
  const courses = useSelector(
    (state: RootState) =>
      state.core.courses[`${year}-${season}-${subjectCode}-${schoolCode}`]
  );
  const error = useSelector((state: RootState) => state.core.error);
  if (loadingState === LoadingState.Loading || courses === undefined) {
    return <h2> Loading...</h2>;
  }
  if (loadingState === LoadingState.Failed) {
    return <div css={{ color: "red" }}> {error} </div>;
  }
  const subjectCourses = [...courses];
  return (
    <div>
      {subjectCourses
        .sort((a, b) => parseInt(a.deptCourseId) - parseInt(b.deptCourseId))
        .map((course: ICourse) => (
          <Course
            key={course.deptCourseId}
            name={course.name}
            deptCourseId={course.deptCourseId}
            sections={course.sections}
          />
        ))}
    </div>
  );
};
