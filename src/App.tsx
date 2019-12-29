/** @jsx jsx */
import { jsx } from "@emotion/core";

import React, { useEffect, useState } from "react";
import Course from "./Course";

interface Section {
  registrationNumber: number;
  sectionCode: string;
  instructor: string;
  type: string;
  status: string;
  meetings: Array<Meeting>;
  recitations: Array<Section> | null;
}

interface Meeting {
  beginDate: Date;
  duration: number;
  endDate: Date;
}

interface Course {
  name: string;
  deptCourseId: string;
  sections: Array<Section>;
}

const App: React.FC = () => {
  const [courses, setCourses] = useState<Array<Course>>([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://schedge.a1liu.com/2020/sp/ua/csci");
        const payload = await res.json();
        setCourses(payload);
      } catch (err) {
        console.log("ERROR");
        console.log(err);
      }
    })();
  }, []);
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        padding: "20px"
      }}
    >
      <header className="App-header">
        <h1> Courses </h1>
      </header>
      <div>
        {courses
          .sort((a, b) => parseInt(a.deptCourseId) - parseInt(b.deptCourseId))
          .map((course: Course) => (
            <Course name={course.name} deptCourseId={course.deptCourseId} />
          ))}
      </div>
    </div>
  );
};

export default App;
