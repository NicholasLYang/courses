/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useDispatch, useSelector } from "react-redux";
import { LoadingState } from "./types";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import { getSchools, RootState } from "./duck";
import MainPage from "./MainPage";

const styles = {
  App: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100vw"
  },
  content: {
    width: "90vw"
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
            <Route path="/:year/:season">
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
              <Route path="/:year/:season/:schoolCode?/:subjectCode?/:courseCode?">
                <MainPage />
              </Route>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
