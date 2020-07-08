/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import MainPage from "./MainPage";
import MobileMainPage from "./MobileMainPage";
import { useWindowWidth } from "@react-hook/window-size/dist/es";
import CompSciRequirementsPage from "./CompSciRequirementsPage";

const styles = {
  App: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100vw"
  },
  banner: {
    backgroundColor: "#17315c",
    color: "white",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  bannerText: {
    width: "90vw"
  },
  content: {
    width: "90vw"
  }
} as const;

const App: React.FC = () => {
  const width = useWindowWidth();
  return (
    <div css={styles.App}>
      <Router>
        <header css={styles.banner}>
          <h2 css={styles.bannerText}>
            International Students: In-person courses are in{" "}
            <span css={{ color: "#ff0099" }}> MAGENTA</span> and blended courses
            are in <span css={{ color: "#7d7dff" }}> BLUE </span>{" "}
          </h2>
        </header>
        <div css={styles.content}>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/comp-sci-reqs">
              <CompSciRequirementsPage />
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
                {width > 700 ? <MainPage /> : <MobileMainPage />}
              </Route>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
