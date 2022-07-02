import React from "react";
import PropTypes from "prop-types";
// import TodoItem from "./TodoItem";
import TodoItem from "../TodoItem/TodoItem";
const TodoList = ({ setTodos, todos }) => {
  return (
    <ul id="list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} setTodos={setTodos} todo={todo} />
      ))}
    </ul>
  );
};
export default TodoList;

TodoList.prototypes = {
  setTodos: PropTypes.array,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
      status: PropTypes.bool,
    })
  ),
};

TodoList.defaultProps = {
  setTodos: [],
  todos: [],
};
