import React from "react";
import PropTypes from "prop-types";
import { Loader } from "monday-ui-react-core";

const LoaderTodos = () => {
  return (
    <div align="center">
      <Loader
        className="list-loader"
        color={Loader.colors.PRIMARY}
        size={Loader.sizes.MEDIUM}
      />
    </div>
  );
};

export default LoaderTodos

LoaderTodos.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
};