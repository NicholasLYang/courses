/** @jsx jsx */
import { jsx } from "@emotion/core";

import React from "react";
import SchoolSubjectsList from "./SchoolSubjectsList";
import { useSelector } from "react-redux";
import { RootState } from "./duck";
import View from "./View";

interface Props {
  schoolCode: string;
  year: string;
  season: string;
}

const SchoolPage: React.FC<Props> = ({ schoolCode, year, season }) => {
  const schools = useSelector((state: RootState) => state.core.schools);
  const school = schools[schoolCode];
  return (
    <View>
      <h2> {school?.name || schoolCode}</h2>
      <SchoolSubjectsList schoolCode={schoolCode} year={year} season={season} />
    </View>
  );
};

export default SchoolPage;
