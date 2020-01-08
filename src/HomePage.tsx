/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect, useState } from "react";
import { API_URL } from "./constants";
import { LoadingState } from "./types";
import { Link } from "react-router-dom";

interface School {
  code: string;
  name: string;
}
const HomePage = () => {
  const [loadingState, setLoadingState] = useState(LoadingState.Loading);
  const [schools, setSchools] = useState<Array<School>>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/schools`);
        const payload = await res.json();
        setSchools(payload);
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
    <ul css={{ display: "flex", flexDirection: "column", lineHeight: "1.5em" }}>
      {schools.map(school => (
        <Link to={`/${school.code}`}> {school.name} </Link>
      ))}
    </ul>
  );
};

export default HomePage;
