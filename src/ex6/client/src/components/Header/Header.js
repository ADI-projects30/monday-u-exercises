import React from "react";
import { Heading } from "monday-ui-react-core";
import "monday-ui-react-core/dist/main.css";
import "../Header/Header.css";

const Header = () => {
  return (
    <div className="app-name">
      <Heading ellipsis={false} value="TodoApp" />
    </div>
  );
};

export default Header;
