import React, { useEffect, useCallback, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getItemsList } from "../../selectors/items-entities-selectors";
import LoaderTodos from "../LoaderTodos/LoaderTodos";
import TodoItem from "../TodoItem/TodoItem";
import TodoInput from "../TodoInput/TodoInput";
import SearchTodo from "../SearchTodo/SearchTodo";
import SortTodos from "../SortTodos/SortTodos";
import filterTodosOptions from "../FilterTodosOptions/FilterTodosOptions";
import "./TodoList.css";
import {
  loadTodosListAction,
  removeTodoAction,
  updateItemAction,
} from "../../actions/todo-actions";

const TodoList = ({
  todosList,
  removeTodoAction,
  loadTodosListAction,
  updateItemAction,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [filterStatusValue, setFilterStatusValue] = useState("");

  const loadTodos = useCallback(async () => {
    await loadTodosListAction();
  }, [loadTodosListAction]);

  useEffect(() => {
    setIsLoading(true);
    loadTodos();
    setIsLoading(false);
  }, []);

  const handleTodoDelete = useCallback(
    async (todo) => {
      removeTodoAction(todo);
    },
    [removeTodoAction]
  );

  const handleFilterTodos = useCallback((value) => {
    setIsLoading(true);
    setFilterStatusValue(value);
    setIsLoading(false);
  }, []);

  const handleTodoUpdate = useCallback(
    async (item) => {
      updateItemAction(item);
    },
    [updateItemAction]
  );

  const handleTodoStatusUpdate = async (item) => {
    item.status = !item.status;
    await handleTodoUpdate(item);
  };

  const handleSearchTodo = useCallback((value) => {
    setIsLoading(true);
    setSearchInputValue(value);
    setIsLoading(false);
  }, []);

  return (
    <>
      <TodoInput />
      <SearchTodo
        placeholder={"Search Todos"}
        loading={isLoading}
        onChange={handleSearchTodo}
      />
      <ul id="list">
        {!isLoading ? (
          todosList
            .filter(
              (todo) =>
                (todo.name.toLowerCase().includes(searchInputValue) ||
                  searchInputValue === "") &&
                (todo.status === filterStatusValue || filterStatusValue === "")
            )
            .map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                name={todo.name}
                status={todo.status}
                handleTodoStatusUpdate={() => handleTodoStatusUpdate(todo)}
                handleTodoDelete={() => handleTodoDelete(todo)}
              />
            ))
        ) : (
          <LoaderTodos />
        )}
      </ul>
      <SortTodos
        options={filterTodosOptions}
        onSelect={(value) => handleFilterTodos(value)}
      />
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const todosList = getItemsList(state);

  return { todosList };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    {
      loadTodosListAction,
      removeTodoAction,
      updateItemAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
