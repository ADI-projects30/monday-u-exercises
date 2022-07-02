import { React, useRef } from "react";
import PropTypes from "prop-types";
import "../TodoInput/TodoInput.css";
import Button from "../Button/Button";
const TodoInput = ({ createTodo }) => {
  const TodoInput = useRef("");
  const handleSubmit = (e) => {
    e.preventDefault();
    createTodo(TodoInput.current.value);
    TodoInput.current.value = "";
  };
  return (
    <div className="list-controls">
      <input
        type="text"
        id="list-item-input"
        placeholder="Add your new todo"
        ref={TodoInput}
      />
      <Button as="button" click={handleSubmit}></Button>
    </div>
  );
};

export default TodoInput;

TodoInput.prototypes = {
  createTodo: PropTypes.func,
};

TodoInput.defaultProps = {
  createTodo: () => console.log("create Todo"),
};
