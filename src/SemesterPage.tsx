/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Link, useParams } from "react-router-dom";

interface Props {
  schools: { [s: string]: string };
}

const SemesterPage: React.FC<Props> = ({ schools }) => {
  const { semester } = useParams();
  return (
    <ul css={{ display: "flex", flexDirection: "column", lineHeight: "1.5em" }}>
      {Object.entries(schools).map(([code, name]) => (
        <Link key={code} to={`/${semester}/${code}`}>
          {" "}
          {name}{" "}
        </Link>
      ))}
    </ul>
  );
};

export default SemesterPage;
