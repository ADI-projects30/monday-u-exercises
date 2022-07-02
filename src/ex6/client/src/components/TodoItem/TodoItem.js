import { React } from "react";
import { ItemClient } from "../../services/item_client";
import PropTypes from "prop-types";
import delete_icon from "../../images/delete_icon.svg";
import Button from "../Button/Button";
import "../TodoItem/TodoItem.css";
import "../Button/Button.css";

const TodoItem = ({ setTodos, todo }) => {
  let itemClient = new ItemClient();

  const deleteHandler = async () => {
    await itemClient.deleteItem(todo);
    setTodos(await itemClient.getItems());
  };

  const toggleHandler = async () => {
    await itemClient.toggleDone(todo);
    setTodos(await itemClient.getItems());
  };

  return (
    <li className="list-item">
      <Button
        as="input"
        id={todo.id}
        status={todo.status}
        change={toggleHandler}
      ></Button>
      <p className="list-item-text">{todo.name}</p>
      <Button as="img" delete_icon={delete_icon} click={deleteHandler}></Button>
    </li>
  );
};

export default TodoItem;

TodoItem.prototypes = {
  setTodos: PropTypes.array,
  todo: PropTypes.string,
};

TodoItem.defaultProps = {
  setTodos: [],
};
