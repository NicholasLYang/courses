/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { FormEvent, useEffect, useState } from "react";
import { API_URL } from "./constants";
import Course from "./Course";
import { ICourse } from "./types";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage: React.FC = () => {
  const { year, season } = useParams();
  const query = useQuery();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(query.get("query") || "");
  const [searchResults, setSearchResults] = useState<
    Array<ICourse> | undefined
  >(undefined);
  useEffect(() => {
    if (text !== "") {
      handleSubmit();
    } // eslint-disable-next-line
  }, []);
  async function handleSubmit() {
    setLoading(true);
    const encodedQuery = encodeURI(text);
    history.push(`/${year}/${season}/search?query=${encodedQuery}`);
    const res = await fetch(
      `${API_URL}/${year}/${season}/search?query=${encodedQuery}`
    );
    setLoading(false);
    const searchResults: Array<ICourse> = await res.json();
    setSearchResults(searchResults);
  }
  return (
    <div>
      {" "}
      <Link to={`/${year}/${season}`}> &#8592; Back </Link>
      <h1> Search </h1>
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          return handleSubmit();
        }}
      >
        <input
          value={text}
          onChange={e => setText(e.currentTarget.value)}
          type="text"
          css={{ margin: "5px" }}
        />
        <button type="submit">Search</button>
      </form>
      {loading && (
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      <div css={{ padding: "10px" }}>
        {searchResults?.map((result, i) => (
          <Course
            key={`${result.subjectCode.code}-${result.subjectCode.school}-${result.deptCourseId}`}
            schoolCode={result.subjectCode.school}
            subjectCode={result.subjectCode.code}
            name={result.name}
            deptCourseId={result.deptCourseId}
            year={year!}
            season={season!}
            isOdd={!!(i % 2)}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
