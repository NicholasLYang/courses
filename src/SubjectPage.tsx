/** @jsx jsx */
import { jsx } from "@emotion/core";

import React, { useEffect, useState } from "react";
import Course from "./Course";
import { ICourse } from "./App";
import { useParams, useHistory } from "react-router-dom";
import { getOrKey } from "./utils";
import { subjectNames } from "./constants";

const styles = {
  SubjectPage: {
    display: "flex",
    flexDirection: "column" as "column"
  }
};

const SubjectPage: React.FC = () => {
  const { code } = useParams();
  const history = useHistory();
  const [courses, setCourses] = useState<Array<ICourse>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  if (code === undefined) {
    history.push("/");
  }
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://api.albertsucks.com/2020/sp/ua/${code}`
        );
        const payload = await res.json();
        setCourses(payload);
        setLoading(false);
      } catch (err) {
        console.log("ERROR");
        console.log(err);
      }
    })();
  }, [code]);
  if (loading) {
    return (
      <div css={styles.SubjectPage}>
        <h2> {getOrKey(code!, subjectNames)} </h2>
        <header>
          <h3> Courses </h3>
        </header>
        <div>Loading...</div>
      </div>
    );
  }
  return (
    <div css={styles.SubjectPage}>
      <h2> {getOrKey(code!, subjectNames)} </h2>
      <header>
        <h3> Courses </h3>
      </header>
      <div>
        {courses
          .sort((a, b) => parseInt(a.deptCourseId) - parseInt(b.deptCourseId))
          .map((course: ICourse) => (
            <Course
              name={course.name}
              deptCourseId={course.deptCourseId}
              sections={course.sections}
            />
          ))}
      </div>
    </div>
  );
};

export default SubjectPage;
