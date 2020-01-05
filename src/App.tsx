/** @jsx jsx */
import { jsx } from "@emotion/core";

import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SubjectPage from "./SubjectPage";
import HomePage from "./HomePage";

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

export interface ICourse {
  name: string;
  deptCourseId: string;
  sections: Array<ISection>;
}

const styles = {
  App: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    width: "100vw"
  },
  content: {
    width: "60vw"
  }
};

const App: React.FC = () => {
  return (
    <div css={styles.App}>
      <Router>
        <Link
          css={{
            textDecoration: "none",
            color: "black",
            "&:hover": {
              textDecoration: "underline"
            }
          }}
          to="/"
        >
          <h1> Schedge </h1>
        </Link>
        <div css={styles.content}>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/:code">
              <SubjectPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
