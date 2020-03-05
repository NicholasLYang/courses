import React from "react";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import SchoolSubjectsList from "./SchoolSubjectsList";
import { getOrKey } from "./utils";
import { useSelector } from "react-redux";
import { RootState } from "./duck";

const SchoolPage: React.FC = () => {
  const { school, semester } = useParams();
  const schools = useSelector((state: RootState) => state.core.schools);
  const history = useHistory();

  if (school === undefined || semester === undefined) {
    history.push("/");
    return (
      <div>
        No school selected! Please go <Link to="/"> back</Link>
      </div>
    );
  } else {
    return (
      <div>
        <h2> {getOrKey(school, schools)}</h2>
        <SchoolSubjectsList school={school} semester={semester} />
      </div>
    );
  }
};

export default SchoolPage;
