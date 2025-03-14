import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Review } from 'src/modules/todo/domain/Review';

export type ReviewRecord = {
  createdAt: string;
  todoIdList: string[];
};

const initialState: { record: ReviewRecord | undefined } = {
  record: undefined,
};

const toRecord = (review: Review): ReviewRecord => ({
  createdAt: review.createdAt.toISOString(),
  todoIdList: review.todoIdList,
});

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    saveReview: (state, action: PayloadAction<Review>) => {
      state.record = toRecord(action.payload);
    },
    deleteReview: (state) => {
      state.record = undefined;
    },
  },
});

export const { saveReview, deleteReview } = reviewSlice.actions;
export const reviewReducer = reviewSlice.reducer;
