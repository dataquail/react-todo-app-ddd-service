import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ActiveTodo } from 'src/modules/todo/domain/ActiveTodo';

type ActiveTodoDictionary = {
  [id: string]: ActiveTodo | undefined;
};

const initialState = {
  dict: {} as ActiveTodoDictionary,
};

export const activeTodosSlice = createSlice({
  name: 'activeTodo',
  initialState,
  reducers: {
    saveActiveTodo: (state, action: PayloadAction<ActiveTodo>) => {
      const newActiveTodo = action.payload;
      const oldActiveTodo = state.dict[action.payload.id];
      state.dict[action.payload.id] = {
        ...state.dict[action.payload.id],
        ...action.payload,
        isPrioritized: getIsPrioritizedValueToSave(
          newActiveTodo,
          oldActiveTodo,
        ),
      };
    },
    saveAllActiveTodos: (state, action: PayloadAction<ActiveTodo[]>) => {
      const newActiveTodos = action.payload;
      for (const newActiveTodo of newActiveTodos) {
        const oldActiveTodo = state.dict[newActiveTodo.id];
        state.dict[newActiveTodo.id] = {
          ...state.dict[newActiveTodo.id],
          ...newActiveTodo,
          isPrioritized: getIsPrioritizedValueToSave(
            newActiveTodo,
            oldActiveTodo,
          ),
        };
      }
    },
    removeActiveTodo: (state, action: PayloadAction<string>) => {
      const activeTodoId = action.payload;
      delete state.dict[activeTodoId];
    },
    removeAllActiveTodos: (state) => {
      state.dict = {};
    },
  },
});

export const {
  saveActiveTodo,
  saveAllActiveTodos,
  removeActiveTodo,
  removeAllActiveTodos,
} = activeTodosSlice.actions;
export const activeTodosReducer = activeTodosSlice.reducer;

// UTILS
const getIsPrioritizedValueToSave = (
  newActiveTodo: ActiveTodo,
  oldActiveTodo: ActiveTodo | undefined,
) =>
  newActiveTodo.isPrioritized === false || newActiveTodo.isPrioritized === true
    ? newActiveTodo.isPrioritized
    : oldActiveTodo?.isPrioritized === false ||
        oldActiveTodo?.isPrioritized === true
      ? oldActiveTodo?.isPrioritized
      : false;
