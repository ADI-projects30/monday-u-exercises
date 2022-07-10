import actionTypes from "../actions/constants";

const initialState = {
  todosList: [],
};

const itemsEntitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TODOS:
      const { todosList } = action;
      return { ...state, todosList };

    case actionTypes.ADD_TODO:
      const todosInput = [...state.todosList, action.item];
      return { ...state, todosList: todosInput };

    case actionTypes.UPDATE_TODO:
      const todoIndex = state.todosList.findIndex(
        (todo) => todo.id === action.item.id
      );
      state.todosList[todoIndex] = action.item;
      return { ...state, todosList: [...state.todosList] };

    case actionTypes.REMOVE_TODO:
      return {
        ...state,
        todosList: state.todosList.filter((todo) => todo.id !== action.item.id),
      };

    default:
      return state;
  }
};

export default itemsEntitiesReducer;
