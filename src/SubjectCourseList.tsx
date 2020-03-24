/** @jsx jsx */
import { jsx } from "@emotion/core";

import React, { useEffect, useState } from "react";
import { LoadingState } from "./types";
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
  const [activeCourse, setActiveCourse] = useState<string | undefined>(
    undefined
  );
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
  const subjectCourses = Object.entries(courses);
  return (
    <div>
      {subjectCourses
        .sort(
          (a, b) => parseInt(a[1].deptCourseId) - parseInt(b[1].deptCourseId)
        )
        .map(([code, course], i) => (
          <Course
            handleClick={() => {
              setActiveCourse(code);
            }}
            active={activeCourse === code}
            schoolCode={schoolCode}
            subjectCode={subjectCode}
            key={code}
            name={course.name}
            deptCourseId={course.deptCourseId}
            year={year}
            season={season}
            isOdd={i % 2 !== 0}
          />
        ))}
    </div>
  );
};
