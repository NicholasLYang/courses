/** @jsx jsx */
import { jsx } from "@emotion/core";
import { ReactNodeArray } from "react";
import { Link, useParams } from "react-router-dom";
import SemesterView from "./SemesterView";
import SchoolView from "./SchoolView";
import SubjectView from "./SubjectView";
import CourseView from "./CourseView";
import React from "react";
import { convertTerm } from "./utils";

const styles = {
  MainPage: {
    display: "flex"
  }
} as const;

interface Props {
  children: any;
}

const BreadcrumbSeparator: React.FC<Props> = ({ children, ...props }) => (
  <li
    style={{ margin: "auto 6px" }}
    className="breadcrumb-separator"
    {...props}
  >
    {children}
  </li>
);

const BreadcrumbItem: React.FC<Props> = ({ children, ...props }) => (
  <li className="breadcrumb-item" {...props}>
    {children}
  </li>
);

const Breadcrumb: React.FC<Props> = props => {
  let children = React.Children.toArray(props.children);
  children = children.map((child, index) => (
    <BreadcrumbItem key={`breadcrumb_item${index}`}>{child}</BreadcrumbItem>
  ));

  const lastIndex = children.length - 1;
  children = children.reduce((acc, child, index) => {
    const notLast = index < lastIndex;
    if (notLast) {
      acc.push(
        child,
        <BreadcrumbSeparator key={`breadcrumb_sep${index}`}>
          {"<-"}
        </BreadcrumbSeparator>
      );
    } else {
      acc.push(child);
    }
    return acc;
  }, []);

  return (
    <ol style={{ listStyle: "none", display: "flex", alignItems: "center" }}>
      {children}
    </ol>
  );
};

const MainPage = () => {
  const { subjectCode, schoolCode, courseCode, year, season } = useParams();
  let views: ReactNodeArray = [];
  let items = [
    { to: `/`, label: convertTerm(season) },
    { to: `/${year}/${season}/${schoolCode}`, label: `${schoolCode}` },
    {
      to: `/${year}/${season}/${schoolCode}/${subjectCode}`,
      label: `${subjectCode}`
    },
    {
      to: `/${year}/${season}/${schoolCode}/${subjectCode}/${courseCode}`,
      label: `${courseCode}`
    }
  ];

  // There's probably a way more intelligent way of doing this but basically
  // we're going down the list of params and depending on which are undefined,
  // we pick the most specific views we can display
  if (year !== undefined && season !== undefined) {
    if (schoolCode !== undefined) {
      if (subjectCode !== undefined) {
        if (courseCode !== undefined) {
          items = [
            { to: `/`, label: convertTerm(season) },
            { to: `/${year}/${season}/${schoolCode}`, label: `${schoolCode}` },
            {
              to: `/${year}/${season}/${schoolCode}/${subjectCode}`,
              label: `${subjectCode}`
            },
            {
              to: `/${year}/${season}/${schoolCode}/${subjectCode}/${courseCode}`,
              label: `${courseCode}`
            }
          ];
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
          items = [
            { to: `/`, label: convertTerm(season) },
            { to: `/${year}/${season}/${schoolCode}`, label: `${schoolCode}` },
            {
              to: `/${year}/${season}/${schoolCode}/${subjectCode}`,
              label: `${subjectCode}`
            }
          ];
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
        items = [
          { to: `/`, label: convertTerm(season) },
          { to: `/${year}/${season}/${schoolCode}`, label: `${schoolCode}` }
        ];
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
      items = [{ to: `/`, label: convertTerm(season) }];
      views = [<SemesterView key={0} year={year} season={season} />];
    }
  }
  return (
    <div>
      <Breadcrumb>
        {items.map(({ to, label }) => (
          <Link key={to} to={to}>
            {label}
          </Link>
        ))}
      </Breadcrumb>
      <div css={styles.MainPage}>{views}</div>
    </div>
  );
};

export default MainPage;
