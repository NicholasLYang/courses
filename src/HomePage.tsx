/** @jsx jsx */
import { jsx } from "@emotion/core";

import { Link } from "react-router-dom";
import { API_URL, subjectNames } from "./constants";
import { useEffect, useState } from "react";
import { getOrKey } from "./utils";

interface Subject {
  school: string;
  subject: string;
}

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<Array<Subject>>([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/subjects`);
        const payload = await res.json();
        setSubjects(payload);
        setLoading(false);
      } catch (err) {
        console.error(`Error fetching subjects: ${err}`);
      }
    })();
  }, []);
  if (loading) {
    return <h2> Loading...</h2>;
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
