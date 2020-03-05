/** @jsx jsx */
import { jsx } from "@emotion/core";

import React, { useEffect, useState } from "react";
import { ICourse, LoadingState } from "./types";
import { API_URL, subjectNames } from "./constants";
import { getOrKey } from "./utils";
import Course from "./Course";

interface Props {
  code: string;
  school: string;
  year: string;
  season: string;
}

export const SubjectCourseList: React.FC<Props> = ({
  code,
  school,
  year,
  season
}) => {
  const [courses, setCourses] = useState<Array<ICourse>>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.Loading
  );
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${API_URL}/${year}/${season}/${school}/${code}`
        );
        const payload = await res.json();
        setCourses(payload);
        setLoadingState(LoadingState.Success);
      } catch (err) {
        setLoadingState(LoadingState.Failed);
        setError(
          `Error fetching subject ${getOrKey(code!, subjectNames)}: ${err}`
        );
      }
    })();
  }, [code, school, season, year]);
  if (loadingState === LoadingState.Loading) {
    return <div>Loading...</div>;
  }
  if (loadingState === LoadingState.Failed) {
    return <div css={{ color: "red" }}> {error} </div>;
  }
  if (courses.length === 0) {
    return <div> No courses available </div>;
  }
  return (
    <div>
      {courses
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
