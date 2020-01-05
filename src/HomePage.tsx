/** @jsx jsx */
import { jsx } from "@emotion/core";

import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div css={{ display: "flex", flexDirection: "column" }}>
      <Link to="/csci"> Computer Science </Link>
      <Link to="/math"> Math </Link>
    </div>
  );
};

export default HomePage;
