import { configureStore, createSlice } from "@reduxjs/toolkit";
import { v4 as generateId } from "uuid";

import { ProducerType } from "@/types";

export const producersSlice = createSlice({
  name: "producers",
  initialState: [] as ProducerType[],
  reducers: {
    createProducer: (state, { payload }) => {
      console.log({ state, payload });
      return [...state, { ...payload, id: generateId() }];
    },
  },
});

export const store = configureStore({
  reducer: {
    producers: producersSlice.reducer,
  },
});

export const useProducers = (state: { producers: ProducerType[] }) => {
  return state;
};

export const { createProducer } = producersSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
