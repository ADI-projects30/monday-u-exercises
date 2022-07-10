import TodoList from "../TodoList/TodoList";
import styles from "./TodoAppContainer.module.scss";
import Header from "../Header/Header";

function TodoAppContainer() {
  return (
      <div className={styles.listContainer}>
        <Header />
        <div>{<TodoList />}</div>
      </div>
  );
}

export default TodoAppContainer