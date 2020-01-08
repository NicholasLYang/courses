import React from "react";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import SchoolSubjectsList from "./SchoolSubjectsList";

const SchoolPage = () => {
  const { school } = useParams();
  const history = useHistory();

  if (school === undefined) {
    history.push("/");
    return (
      <div>
        No school selected! Please go <Link to="/"> back</Link>
      </div>
    );
  } else {
    return (
      <div>
        <h2> {school}</h2>
        <SchoolSubjectsList school={school} />
      </div>
    );
  }
};

export default SchoolPage;
