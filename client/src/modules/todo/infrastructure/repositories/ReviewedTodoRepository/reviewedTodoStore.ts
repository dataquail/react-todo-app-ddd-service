import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ReviewedTodo } from 'src/modules/todo/domain/ReviewedTodo';

export type ReviewedTodoRecord = {
  id: string;
  lastReviewedAt: string;
};

export type ReviewedTodoDict = {
  [key: string]: ReviewedTodoRecord | undefined;
};

const initialState: ReviewedTodoDict = {};

const toRecord = (reviewedTodo: ReviewedTodo): ReviewedTodoRecord => ({
  id: reviewedTodo.id,
  lastReviewedAt: reviewedTodo.lastReviewedAt.toISOString(),
});

export const reviewedTodoSlice = createSlice({
  name: 'reviewedTodo',
  initialState,
  reducers: {
    saveReviewedTodo: (state, action: PayloadAction<ReviewedTodo>) => {
      state[action.payload.id] = toRecord(action.payload);
    },
    saveManyReviewedTodos: (state, action: PayloadAction<ReviewedTodo[]>) => {
      action.payload.forEach((reviewedTodo) => {
        state[reviewedTodo.id] = toRecord(reviewedTodo);
      });
    },
    deleteReviewedTodo: (state, action: PayloadAction<ReviewedTodo>) => {
      delete state[action.payload.id];
    },
  },
});

export const { saveReviewedTodo, saveManyReviewedTodos, deleteReviewedTodo } =
  reviewedTodoSlice.actions;
export const reviewedTodoReducer = reviewedTodoSlice.reducer;
