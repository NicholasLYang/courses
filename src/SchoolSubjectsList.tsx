/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrKey } from "./utils";
import { API_URL, subjectNames } from "./constants";
import { LoadingState } from "./types";

interface Subject {
  school: string;
  subject: string;
}

interface Props {
  school: string;
}

const SchoolSubjectsList: React.FC<Props> = ({ school }) => {
  const [loadingState, setLoadingState] = useState(LoadingState.Loading);
  const [subjects, setSubjects] = useState<Array<Subject>>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/subjects?school=${school}`);
        const payload = await res.json();
        setSubjects(payload);
        setLoadingState(LoadingState.Success);
      } catch (err) {
        setLoadingState(LoadingState.Failed);
        setError(`Error fetching subjects: ${err}`);
      }
    })();
  }, [school]);
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
        .map(({ subject, school }) => (
          <Link key={subject} to={`/${school}/${subject}`}>
            {getOrKey(subject.toLowerCase(), subjectNames)}
          </Link>
        ))}
    </div>
  );
};

export default SchoolSubjectsList;