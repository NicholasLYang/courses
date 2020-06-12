/** @jsx jsx */
import { jsx } from "@emotion/core";
import { ReactNodeArray } from "react";
import { useParams } from "react-router-dom";
import SemesterView from "./SemesterView";
import SchoolView from "./SchoolView";
import SubjectView from "./SubjectView";
import CourseView from "./CourseView";

const styles = {
  MainPage: {
    display: "flex"
  }
} as const;

const MainPage = () => {
  const { subjectCode, schoolCode, courseCode, year, season } = useParams();
  let views: ReactNodeArray = [];
  // There's probably a way more intelligent way of doing this but basically
  // we're going down the list of params and depending on which are undefined,
  // we pick the most specific views we can display
  if (year !== undefined && season !== undefined) {
    if (schoolCode !== undefined) {
      if (subjectCode !== undefined) {
        if (courseCode !== undefined) {
          views = [
            <SubjectView
              key={2}
              shouldDisplayBack={true}
              year={year}
              season={season}
              schoolCode={schoolCode}
              subjectCode={subjectCode}
            />,
            <CourseView
              key={3}
              year={year}
              season={season}
              schoolCode={schoolCode}
              subjectCode={subjectCode}
              courseCode={courseCode}
            />
          ];
        } else {
          views = [
            <SchoolView
              key={1}
              shouldDisplayBack={true}
              year={year}
              season={season}
              schoolCode={schoolCode}
            />,
            <SubjectView
              key={2}
              shouldDisplayBack={false}
              subjectCode={subjectCode}
              schoolCode={schoolCode}
              year={year}
              season={season}
            />
          ];
        }
      } else {
        views = [
          <SemesterView key={0} year={year} season={season} />,
          <SchoolView
            key={1}
            shouldDisplayBack={false}
            schoolCode={schoolCode}
            year={year}
            season={season}
          />
        ];
      }
    } else {
      views = [<SemesterView key={0} year={year} season={season} />];
    }
  }
  return <div css={styles.MainPage}>{views}</div>;
};

export default MainPage;
