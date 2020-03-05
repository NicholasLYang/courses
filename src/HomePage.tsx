/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Link } from "react-router-dom";

interface Props {
  schools: { [s: string]: string };
}

const HomePage: React.FC<Props> = () => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        lineHeight: "1.5em",
        paddingTop: "50px"
      }}
    >
      <Link to={`/spring20`}> Spring 2020 </Link>
      <Link to={`/fall20`}> Fall 2020 </Link>
    </div>
  );
};

export default HomePage;
