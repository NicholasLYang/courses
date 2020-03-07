/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect } from "react";
import { getCourses, RootState } from "./duck";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SectionsList from "./SectionsList";
import { LoadingState } from "./types";

const CoursePage = () => {
  const { subjectCode, schoolCode, courseCode, year, season } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourses(year!, season!, schoolCode!, subjectCode!));
  }, [subjectCode, schoolCode, season, year, dispatch]);
  const course = useSelector(
    (state: RootState) =>
      state.core.courses[`${year}-${season}-${subjectCode}-${schoolCode}`][
        courseCode!
      ]
  );
  const loadingState = useSelector(
    (state: RootState) => state.core.loadingState
  );
  const error = useSelector((state: RootState) => state.core.error);
  if (loadingState === LoadingState.Loading) {
    return <h2> Loading...</h2>;
  }
  if (loadingState === LoadingState.Failed) {
    return <div css={{ color: "red" }}> {error} </div>;
  }
  return (
    <div>
      <h1> {course.name} </h1>
      <SectionsList sections={course.sections} />
    </div>
  );
};

export default CoursePage;
