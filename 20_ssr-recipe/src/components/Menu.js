import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <ul>
      <li>
        <Link to="/red">Red로 GO!!</Link>
      </li>
      <li>
        <Link to="/blue">Blue로 GO!!</Link>
      </li>
    </ul>
  );
};

export default Menu;
