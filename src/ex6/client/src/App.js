import { useState, useEffect } from "react";
import { ItemClient } from "./services/item_client";
import TodoList from "./components/TodoList/TodoList";
import TodoInput from "./components/TodoInput/TodoInput";
import Header from "./components/Header/Header";
import { Loader } from "./components/Loader/Loader";
import "./App.css";
import "monday-ui-react-core/dist/main.css";

function App() {
  const [todos, setTodos] = useState([]);
  let itemClient = new ItemClient();

  useEffect(() => {
    const getTodos = async () => {
      setTodos(await itemClient.getItems());
    };
    getTodos();
  }, []);

  const createTodo = async (item) => {
    await itemClient.postItem(item);
    setTodos(await itemClient.getItems());
  };

  return (
    <div className="app-container">
      <div className="list-container">
        <Header />
        <TodoInput createTodo={createTodo} />
        {todos ? <TodoList setTodos={setTodos} todos={todos} /> : <Loader />}
      </div>
    </div>
  );
}

export default App;
