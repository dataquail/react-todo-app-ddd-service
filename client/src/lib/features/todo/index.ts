import { combineReducers } from '@reduxjs/toolkit';
import { activeTodosReducer } from 'src/modules/todo/infrastructure/services/ActiveTodoService/activeTodoStore';
import { reviewReducer } from 'src/modules/todo/infrastructure/repositories/ReviewRepository/reviewStore';
import { reviewedTodoReducer } from 'src/modules/todo/infrastructure/repositories/ReviewedTodoRepository/reviewedTodoStore';

export const todoReducer = combineReducers({
  activeTodos: activeTodosReducer,
  review: reviewReducer,
  reviewedTodo: reviewedTodoReducer,
});
