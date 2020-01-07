/** @jsx jsx */
import { jsx } from "@emotion/core";

import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import SubjectPage from "./SubjectPage";
import HomePage from "./HomePage";

const styles = {
  App: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    width: "100vw",
    paddingBottom: "50px"
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
