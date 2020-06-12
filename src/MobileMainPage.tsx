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
        view = (
          <CourseView
            key={3}
            shouldDisplayBack={true}
            year={year}
            season={season}
            schoolCode={schoolCode}
            subjectCode={subjectCode}
            courseCode={courseCode}
          />
        );
      } else {
        view = (
          <SubjectView
            key={2}
            shouldDisplayBack={true}
            subjectCode={subjectCode}
            schoolCode={schoolCode}
            year={year!}
            season={season!}
          />
        );
      }
    } else {
      view = (
        <SchoolView
          key={1}
          shouldDisplayBack={true}
          schoolCode={schoolCode}
          year={year}
          season={season}
        />
      );
    }
  } else {
    view = <SemesterView key={0} year={year} season={season} />;
  }
  return <div css={styles.MobileMainPage}>{view}</div>;
};

export default MobileMainPage;
