/** @jsx jsx */
import { jsx } from "@emotion/core";

import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { getOrKey, parseSemester } from "./utils";
import { subjectNames } from "./constants";
import { SubjectCourseList } from "./SubjectCourseList";

const styles = {
  SubjectPage: {
    display: "flex",
    flexDirection: "column"
  }
} as const;

const SubjectPage: React.FC = () => {
  const { code, school, semester } = useParams();
  const history = useHistory();
  if (code === undefined || school === undefined || semester === undefined) {
    history.push("/");
    return (
      <div>
        No subject selected! Please go <Link to="/"> back</Link>
      </div>
    );
  } else {
    let res: { year: string; season: string };
    try {
      res = parseSemester(semester);
    } catch (e) {
      history.push("/");
    }
    const { year, season } = res!;
    return (
      <div css={styles.SubjectPage}>
        <Link to={`/${semester}/${school}`}> &#8592; Switch subject </Link>
        <h2> {getOrKey(code!.toLowerCase(), subjectNames)} </h2>
        <header>
          <h3> Courses </h3>
        </header>
        <SubjectCourseList
          year={year}
          season={season}
          subjectCode={code}
          schoolCode={school}
        />
      </div>
    );
  }
};

export default SubjectPage;
