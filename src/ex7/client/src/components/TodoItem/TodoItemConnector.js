import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getItemsList } from "../../selectors/items-entities-selectors";
import {
  loadtodosListAction,
  deleteTodo,
  toggleCompleteTodoAction,
} from "../../actions/todo-actions";
import TodoItem from "./TodoItem";
// import TodoItem from "./TodoItem";

const mapStateToProps = (state, ownProps) => {
  const todosList = getItemsList(state);
  // const isLoggedIn = getIsLoggedIn(state);
  return { todosList };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    { loadtodosListAction, deleteTodo, toggleCompleteTodoAction },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
