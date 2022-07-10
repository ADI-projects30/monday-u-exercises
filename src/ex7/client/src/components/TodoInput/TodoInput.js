import { React, useState, useCallback } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getItemsList } from "../../selectors/items-entities-selectors";
import { addTodoAction } from "../../actions/todo-actions";
import Button from "../Button/Button";
import "../TodoInput/TodoInput.css";

const TodoInput = ({ addTodoAction }) => {
  const [inputValue, setInputValue] = useState("");

  const onInputChange = useCallback(
    (e) => {
      setInputValue(e.target.value);
    },
    [setInputValue]
  );

  const handleAddItem = useCallback(async () => {
    await addTodoAction({ item: inputValue });
    setInputValue("");
  }, [addTodoAction, inputValue]);

  return (
    <div className="list-controls">
      <input
        type="text"
        id="list-item-input"
        placeholder="Add your new todo"
        value={inputValue}
        onChange={onInputChange}
      />
      <Button type="button" click={handleAddItem}></Button>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const todosList = getItemsList(state);

  return { todosList };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ addTodoAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);
