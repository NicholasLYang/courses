/** @jsx jsx */
import { jsx } from "@emotion/core";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubjects, RootState } from "./duck";
import View from "./View";
import { Link } from "react-router-dom";
import { LoadingState } from "./types";
import { fixSubjectName } from "./utils";

interface Props {
  schoolCode: string;
  year: string;
  season: string;
  shouldDisplayBack: boolean;
}

const SchoolView: React.FC<Props> = ({
  schoolCode,
  year,
  season,
  shouldDisplayBack
}) => {
  const schools = useSelector(
    (state: RootState) => state.core.schools.entities
  );
  const school = schools[schoolCode];
  const dispatch = useDispatch();
  const loadingState = useSelector(
    (state: RootState) => state.core.subjects.loadingState
  );
  useEffect(() => {
    dispatch(getSubjects(schoolCode));
  }, [dispatch, schoolCode]);
  const error = useSelector((state: RootState) => state.core.subjects.error);
  const subjects = useSelector(
    (state: RootState) => state.core.subjects.entities[schoolCode]
  );
  if (subjects === undefined) {
    return (
      <View>
        <h2> Loading...</h2>
      </View>
    );
  }
  if (loadingState === LoadingState.Failed) {
    return <div css={{ color: "red" }}> {error} </div>;
  }
  return (
    <View>
      <h2> {school?.name || schoolCode}</h2>
      {shouldDisplayBack && (
        <Link to={`/${year}/${season}`}> &#8592; Switch school</Link>
      )}
      <ul
        css={{ display: "flex", flexDirection: "column", lineHeight: "1.5em" }}
      >
        {Object.entries(subjects)
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([code, subject]) => (
            <Link
              css={{
                padding: "10px",
                fontSize: "1.2em",
                textDecoration: "none",
                backgroundColor: "#fefefe",
                width: "30vw",
                "&:nth-child(odd)": {
                  backgroundColor: "#dfdfdf"
                }
              }}
              key={code}
              to={`/${year}/${season}/${schoolCode}/${code}`}
            >
              {fixSubjectName(subject.name, code)}
            </Link>
          ))}
      </ul>
    </View>
  );
};

export default SchoolView;
