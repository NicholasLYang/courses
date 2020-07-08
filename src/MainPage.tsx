/** @jsx jsx */
import { jsx } from "@emotion/core";
import { ReactNodeArray } from "react";
import { useParams, Link } from "react-router-dom";
import SemesterView from "./SemesterView";
import SchoolView from "./SchoolView";
import SubjectView from "./SubjectView";
import CourseView from "./CourseView";

const styles = {
  MainPage: {
    display: "flex",
    flexDirection: "column"
  },
  views: {
    display: "flex"
  }
} as const;

const MainPage = () => {
  const { subjectCode, schoolCode, courseCode, year, season } = useParams();
  let backLink = <Link to="/"> &#8592; Switch Semester </Link>;
  let views: ReactNodeArray = [];
  // There's probably a way more intelligent way of doing this but basically
  // we're going down the list of params and depending on which are undefined,
  // we pick the most specific views we can display
  if (year !== undefined && season !== undefined) {
    if (schoolCode !== undefined) {
      if (subjectCode !== undefined) {
        if (courseCode !== undefined) {
          backLink = (
            <Link to={`/${year}/${season}/${schoolCode}/`}>
              &#8592; Switch Subject
            </Link>
          );
          views = [
            <SubjectView
              key={2}
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
          backLink = (
            <Link to={`/${year}/${season}/`}>&#8592; Switch School</Link>
          );

          views = [
            <SchoolView
              key={1}
              year={year}
              season={season}
              schoolCode={schoolCode}
            />,
            <SubjectView
              key={2}
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
  return (
    <div css={styles.MainPage}>
      {backLink}
      <div css={styles.views}>{views}</div>{" "}
    </div>
  );
};

export default MainPage;
