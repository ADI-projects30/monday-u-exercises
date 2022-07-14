import { render, screen } from "@testing-library/react";
import TodoList from "../TodoList";
import { Provider } from "react-redux";
import { store } from "../../../store";
import {useDispatch} from 'react-redux'
import { addTodo } from "../../../actions/todo-actions";
import '@testing-library/jest-dom';

const items = [
  {
    id: 56,
    name: "Take dog out for a walk",
    status: false,
  },
  {
    id: 32,
    name: "Do the dishes",
    status: true,
  },
  
];

describe("ListContainer", () => {
  test("should render both items (one done and one not)", () => {
    const Mock = () =>{
        const dispatch = useDispatch();
        items.forEach((todo) => {
          dispatch(addTodo(todo));
        });
    }

    render(

      <Provider store={store}>
       <Mock/>
        <TodoList todosList={items} />
      </Provider>

    );

    // TODO: test that both items are rendered at the list
    const linkElement = screen.getByText(/Take dog out for a walk/i);
    const linkElement2 = screen.getByText(/Do the dishes/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement2).toBeInTheDocument();
  });
});