/** @jsx jsx */
import { jsx } from "@emotion/core";
import { API_URL } from "./constants";
import { LoadingState } from "./types";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import SubjectPage from "./SubjectPage";
import HomePage from "./HomePage";
import SchoolPage from "./SchoolPage";
import { delay } from "./utils";

export interface School {
  code: string;
  name: string;
}

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
  const [loadingState, setLoadingState] = useState(LoadingState.Loading);
  const [schools, setSchools] = useState<{ [s: string]: string }>({});
  const [error, setError] = useState("");
  useEffect(() => {
    (async () => {
      try {
        // Just to mess with Albert
        await delay(500 + Math.random() * 500);
        const res = await fetch(`${API_URL}/schools`);
        const payload = await res.json();
        const schools: { [s: string]: string } = {};
        for (const school of payload) {
          schools[school.code] = school.name;
        }
        setSchools(schools);
        setLoadingState(LoadingState.Success);
      } catch (err) {
        setLoadingState(LoadingState.Failed);
        setError(`Error fetching subjects: ${err}`);
      }
    })();
  }, []);
  if (loadingState === LoadingState.Loading) {
    return (
      <div css={{ ...styles.App, height: "100vh", justifyContent: "center" }}>
        <h2> Loading...</h2>;
      </div>
    );
  }
  if (loadingState === LoadingState.Failed) {
    return <div css={{ color: "red" }}> {error} </div>;
  }
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
              <HomePage schools={schools} />
            </Route>
            <Route path="/:school">
              <Switch>
                <Route exact path="/:school">
                  <SchoolPage schools={schools} />
                </Route>
                <Route path="/:school/:code">
                  <SubjectPage />
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
