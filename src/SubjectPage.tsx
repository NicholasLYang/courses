/** @jsx jsx */
import { jsx } from "@emotion/core";

import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { getOrKey } from "./utils";
import { subjectNames } from "./constants";
import { SubjectCourseList } from "./SubjectCourseList";

const styles = {
  SubjectPage: {
    display: "flex",
    flexDirection: "column" as "column"
  }
};

const SubjectPage: React.FC = () => {
  const { code, school } = useParams();
  const history = useHistory();
  if (code === undefined || school === undefined) {
    history.push("/");
    return (
      <div>
        No subject selected! Please go <Link to="/"> back</Link>
      </div>
    );
  } else {
    return (
      <div css={styles.SubjectPage}>
        <h2> {getOrKey(code!.toLowerCase(), subjectNames)} </h2>
        <header>
          <h3> Courses </h3>
        </header>{" "}
        <SubjectCourseList code={code} school={school} />
      </div>
    );
  }
};

export default SubjectPage;
