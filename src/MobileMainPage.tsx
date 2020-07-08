/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useParams, useHistory, Link } from "react-router-dom";
import SemesterView from "./SemesterView";
import SchoolView from "./SchoolView";
import SubjectView from "./SubjectView";
import CourseView from "./CourseView";
import View from "./View";

const styles = {
  MobileMainPage: {
    display: "flex",
    flexDirection: "column"
  }
} as const;

const MobileMainPage = () => {
  const { subjectCode, schoolCode, courseCode, year, season } = useParams();
  const history = useHistory();
  let view = <SemesterView year={year!} season={season!} />;
  let backLink = <Link to="/"> &#8592; Switch Semester </Link>;
  if (year === undefined || season === undefined) {
    history.push("/");
    return (
      <View>
        {" "}
        Invalid path, <Link to="/"> go back </Link>{" "}
      </View>
    );
  }
  // There's probably a way more intelligent way of doing this but basically
  // we're going down the list of params and depending on which are undefined,
  // we pick the most specific views we can display
  if (schoolCode !== undefined) {
    if (subjectCode !== undefined) {
      if (courseCode !== undefined) {
        backLink = (
          <Link to={`/${year}/${season}/${schoolCode}/`}>
            &#8592; Switch Course
          </Link>
        );
        view = (
          <CourseView
            key={3}
            year={year}
            season={season}
            schoolCode={schoolCode}
            subjectCode={subjectCode}
            courseCode={courseCode}
          />
        );
      } else {
        backLink = (
          <Link to={`/${year}/${season}/${schoolCode}/`}>
            &#8592; Switch Subject
          </Link>
        );
        view = (
          <SubjectView
            key={2}
            subjectCode={subjectCode}
            schoolCode={schoolCode}
            year={year!}
            season={season!}
          />
        );
      }
    } else {
      backLink = <Link to={`/${year}/${season}/`}>&#8592; Switch School</Link>;
      view = (
        <SchoolView
          key={1}
          schoolCode={schoolCode}
          year={year}
          season={season}
        />
      );
    }
  }
  return (
    <div css={styles.MobileMainPage}>
      {backLink}
      {view}
    </div>
  );
};

export default MobileMainPage;
