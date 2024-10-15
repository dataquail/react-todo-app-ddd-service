import { combineReducers } from '@reduxjs/toolkit';
import { activeTodosReducer } from 'src/modules/todo/infrastructure/services/ActiveTodoService/activeTodoStore';

export const todoReducer = combineReducers({
  activeTodos: activeTodosReducer,
});
