import itemsEntitiesReducer from "../items-entities-reducer";
import {
  getTodos,
  addTodo,
  updateTodo,
  removeTodo,
} from "../../actions/todo-actions";

const initialState = {
  todosList: [],
};

const getEmptyTodoList = { todosList: [] };

const addTodoItem = {
  id: 1,
  name: "Go to the beach",
  status: false,
};
const ArrayForAddTodoTest = {
  todosList: [addTodoItem],
};

const todosArray = [
  { id: 1, name: "Go to the beach", status: false },
  { id: 2, name: "Charmander", status: false },
  { id: 3, name: "Psyduck", status: false },
];

const ArrayBeforeDeleteTest = {
  todosList: todosArray,
};

const removeChosenTodo = { id: 3, name: "Psyduck", status: false };
const TodosArrayAfterDelete = [
  { id: 1, name: "Go to the beach", status: false },
  { id: 2, name: "Charmander", status: false },
];

const ArrayAfterDeleteTest = {
  todosList: TodosArrayAfterDelete,
};

const updateChosenTodo = { id: 2, name: "Charmander", status: true };
const arrayAfterUpdateTodo = [
  { id: 1, name: "Go to the beach", status: false },
  { id: 2, name: "Charmander", status: true },
];

const todosArrayAfterUpdate = {
  todosList: arrayAfterUpdateTodo,
};

test("should return reducer initial state", () => {
  expect(itemsEntitiesReducer(undefined, { type: undefined })).toEqual(
    initialState
  );
});

test("should return empty list", () => {
  const previousState = [];
  expect(itemsEntitiesReducer(previousState, getTodos([]))).toEqual(
    getEmptyTodoList
  );
});

test("should return todoList array with the todo added", () => {
  const previousState = {
    todosList: [],
  };
  expect(itemsEntitiesReducer(previousState, addTodo(addTodoItem))).toEqual(
    ArrayForAddTodoTest
  );
});

test("should return todoList array without the third todo", () => {
  const previousState = ArrayBeforeDeleteTest;
  expect(
    itemsEntitiesReducer(previousState, removeTodo(removeChosenTodo))
  ).toEqual(ArrayAfterDeleteTest);
});

test("should return todoList array with the second todo updated", () => {
  const previousState = ArrayAfterDeleteTest;
  expect(
    itemsEntitiesReducer(previousState, updateTodo(updateChosenTodo))
  ).toEqual(todosArrayAfterUpdate);
});

test("should return todoList array with all todos in it", () => {
  const previousState = initialState;
  expect(
    itemsEntitiesReducer(
      previousState,
      getTodos(todosArrayAfterUpdate.todosList)
    )
  ).toEqual(todosArrayAfterUpdate);
});
