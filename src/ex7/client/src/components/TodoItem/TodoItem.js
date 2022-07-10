import { React } from "react";
import PropTypes from "prop-types";
import delete_icon from "../../images/delete_icon.svg";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import "../TodoItem/TodoItem.css";
import "../Button/Button.css";
import "../Checkbox/Checkbox.css";

const TodoItem = ({
  name,
  id,
  status,
  handleTodoStatusUpdate,
  handleTodoDelete,
}) => {
  return (
    <li className="list-item">
      <Checkbox
        type="input"
        id={id}
        status={status}
        change={handleTodoStatusUpdate}
      ></Checkbox>
      <p className="list-item-text">{name}</p>
      <Button
        type="img"
        delete_icon={delete_icon}
        click={handleTodoDelete}
      ></Button>
    </li>
  );
};

export default TodoItem;

TodoItem.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  status: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  HandleTodoUpdate: PropTypes.func,
  handleTodoDelete: PropTypes.func,
};

TodoItem.defaultProps = {
  status: 0,
};
