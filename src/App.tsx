/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useDispatch, useSelector } from "react-redux";
import { LoadingState } from "./types";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import SubjectPage from "./SubjectPage";
import HomePage from "./HomePage";
import SchoolPage from "./SchoolPage";
import SemesterPage from "./SemesterPage";
import { getSchools, RootState } from "./duck";
import CoursePage from "./CoursePage";
import SearchPage from "./SearchPage";
import SubwayDoor from "./SubwayDoor";

const styles = {
  App: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100vw",
    paddingBottom: "50px"
  },
  content: {
    width: "60vw"
  }
} as const;

const App: React.FC = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.core.error);
  useEffect(() => {
    dispatch(getSchools());
  }, [dispatch]);
  const loadingState = useSelector(
    (state: RootState) => state.core.loadingState
  );
  if (loadingState === LoadingState.Loading) {
    return (
      <div css={{ ...styles.App, height: "100vh", justifyContent: "center" }}>
        <h2> Loading...</h2>
        <div css={{ display: "flex" }}>
          <SubwayDoor side="left" />
          <SubwayDoor side="right" />
        </div>
      </div>
    );
  }
  if (loadingState === LoadingState.Failed) {
    return <div css={{ color: "red" }}> {error} </div>;
  }
  return (
    <div css={styles.App}>
      <Router>
        <div css={styles.content}>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/:semester">
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
                <h1> Courses </h1>
              </Link>
              <Switch>
                <Route exact path="/:year/:season">
                  <SemesterPage />
                </Route>
                <Route path="/:year/:season/search">
                  <SearchPage />
                </Route>
                <Route exact path="/:year/:season/:schoolCode">
                  <SchoolPage />
                </Route>
                <Route exact path="/:year/:season/:schoolCode/:subjectCode">
                  <SubjectPage />
                </Route>
                <Route path="/:year/:season/:schoolCode/:subjectCode/:courseCode">
                  <CoursePage />
                </Route>
              </Switch>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
