/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Link } from "react-router-dom";

interface Props {
  schools: { [s: string]: string };
}

const HomePage: React.FC<Props> = ({ schools }) => {
  return (
    <ul css={{ display: "flex", flexDirection: "column", lineHeight: "1.5em" }}>
      {Object.entries(schools).map(([code, name]) => (
        <Link to={`/${code}`}> {name} </Link>
      ))}
    </ul>
  );
};

export default HomePage;
