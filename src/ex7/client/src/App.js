import styles from "./App.module.scss";
import TodoAppContainer from "./components/TodoAppContainer/TodoAppContainer";

function App() {
  return (
    <div className={styles.container}>
      <TodoAppContainer />
    </div>
  );
}

export default App;
