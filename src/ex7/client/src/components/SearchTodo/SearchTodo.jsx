import React from "react";
import PropTypes from "prop-types";
import { Search } from "monday-ui-react-core";
import "./SearchTodo.css";

const SearchTodo = ({ placeholder, onChange, loading }) => {
  return (
    <div className="list-item-search">
      <Search
        placeholder={placeholder}
        onChange={onChange}
        loading={loading}
        size={'medium'}
      />
    </div>
  );
};

export default SearchTodo
SearchTodo.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  loading: PropTypes.bool,
  size: PropTypes.string,
};

SearchTodo.defaultProps = {
  placeholder: "",
  onChange: undefined,
  loading: false,
};