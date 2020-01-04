/** @jsx jsx */
import { jsx } from "@emotion/core";

import React, { useEffect, useState } from "react";
import Course from "./Course";

export interface ISection {
  registrationNumber: number;
  sectionCode: string;
  instructor: string;
  type: string;
  status: string;
  meetings: Array<IMeeting>;
  recitations: Array<ISection> | null;
}

export interface IMeeting {
  beginDate: Date;
  duration: number;
  endDate: Date;
}

interface ICourse {
  name: string;
  deptCourseId: string;
  sections: Array<ISection>;
}

const styles = {
  App: {
    display: "flex",
    flexDirection: "column" as "column",
    padding: "20px"
  }
};

const App: React.FC = () => {
  const [courses, setCourses] = useState<Array<ICourse>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://albertsucks.com/2020/sp/ua/csci");
        const payload = await res.json();
        setCourses(payload);
        setLoading(false);
      } catch (err) {
        console.log("ERROR");
        console.log(err);
      }
    })();
  }, []);
  if (loading) {
    return (
      <div css={styles.App}>
        <header className="App-header">
          <h1> Courses </h1>
        </header>
        <div>Loading...</div>
      </div>
    );
  }
  return (
    <div css={styles.App}>
      <header className="App-header">
        <h1> Courses </h1>
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

export default App;
