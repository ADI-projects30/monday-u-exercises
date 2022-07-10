import React from "react";
import PropTypes from "prop-types";
import { ButtonGroup } from "monday-ui-react-core";
import "./SortTodos.css";

const SortTodos = ({ options, onSelect }) => {
  return (
    <div className="list-item-filter">
      <ButtonGroup
        options={options}
        onSelect={onSelect}
        size={'medium'}
      />
    </div>
  );
};

export default SortTodos

SortTodos.propTypes = {
  options: PropTypes.array,
  onSelect: PropTypes.func,
  size: PropTypes.string,
};

SortTodos.defaultProps = {
  options: [],
  onSelect: undefined,
  size: ButtonGroup.sizes.SMALL,
};