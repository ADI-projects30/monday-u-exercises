import actionsTypes from "./constants";
import ListApiService from "../services/list-api-service";

export const getTodos = (todosList) => ({
  type: actionsTypes.GET_TODOS,
  todosList,
});

export const addTodo = (item) => ({
  type: actionsTypes.ADD_TODO,
  item,
});

export const updateTodo = (item) => ({
  type: actionsTypes.UPDATE_TODO,
  item,
});

export const removeTodo = (item) => ({
  type: actionsTypes.REMOVE_TODO,
  item,
});

export const loadtodosListAction = () => {
  return async (dispatch) => {
    const response = await ListApiService.getItems();
    dispatch(getTodos(response));
  };
};

export const addTodoAction = (item) => {
  return async (dispatch) => {
    const items = item.item.split(",");
    let isAllNumbers = items.every((value) => !isNaN(Number(value)));
    let responses;
    if (isAllNumbers) {
      let promises = items.map((id) => ListApiService.postItem(id));
      responses = await Promise.all(promises);
    } else {
      responses = [await ListApiService.postItem(item.item)];
    }
    const data = responses.map((r) => ({
      name: r.itemName,
      id: r.id,
      status: 0,
    }));

    if (Array.isArray(data)) {
      data.forEach((todo) => {
        dispatch(addTodo(todo));
        console.log(`"${todo.name}" todo added`);
      });
    }
  };
};

export const removetodoAction = (item) => {
  return async (dispatch) => {
    await ListApiService.deleteItem(item);
    dispatch(removeTodo(item));
    console.log(`"${item.name}" todo deleted`);
  };
};

export const updateItemAction = (item) => {
  return async (dispatch) => {
    await ListApiService.toggleDone(item);
    dispatch(updateTodo(item));
    console.log(`"${item.name}" todo updated`);
  };
};
