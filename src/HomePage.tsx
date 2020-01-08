/** @jsx jsx */
import { jsx } from "@emotion/core";

import { Link } from "react-router-dom";
import { API_URL, subjectNames } from "./constants";
import { useEffect, useState } from "react";
import { getOrKey } from "./utils";
import { LoadingState } from "./types";

interface Subject {
  school: string;
  subject: string;
}

const HomePage = () => {
  const [loadingState, setLoadingState] = useState(LoadingState.Loading);
  const [subjects, setSubjects] = useState<Array<Subject>>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/subjects`);
        const payload = await res.json();
        setSubjects(payload);
        setLoadingState(LoadingState.Success);
      } catch (err) {
        setLoadingState(LoadingState.Failed);
        setError(`Error fetching subjects: ${err}`);
      }
    })();
  }, []);
  if (loadingState === LoadingState.Loading) {
    return <h2> Loading...</h2>;
  }
  if (loadingState === LoadingState.Failed) {
    return <div css={{ color: "red" }}> {error} </div>;
  }
  return (
    <div
      css={{ display: "flex", flexDirection: "column", lineHeight: "1.5em" }}
    >
      {subjects
        .sort((a, b) => a.subject.localeCompare(b.subject))
        .filter(({ school }) => school === "UA")
        .map(({ subject, school }) => (
          <Link key={subject} to={`/${subject}`}>
            {getOrKey(subject.toLowerCase(), subjectNames)}
          </Link>
        ))}
    </div>
  );
};

export default HomePage;
