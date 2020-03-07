import React from "react";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import SchoolSubjectsList from "./SchoolSubjectsList";
import { useSelector } from "react-redux";
import { RootState } from "./duck";

const SchoolPage: React.FC = () => {
  const { schoolCode, year, season } = useParams();
  const schools = useSelector((state: RootState) => state.core.schools);
  const history = useHistory();

  if (schoolCode === undefined || year === undefined || season === undefined) {
    history.push("/");
    return (
      <div>
        No school selected! Please go <Link to="/"> back</Link>
      </div>
    );
  } else {
    const school = schools[schoolCode];
    return (
      <div>
        <h2> {school.name || schoolCode}</h2>
        <SchoolSubjectsList school={school} year={year} season={season} />
      </div>
    );
  }
};

export default SchoolPage;
