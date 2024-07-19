import { configureStore, createSlice } from "@reduxjs/toolkit";
import { v4 as generateId } from "uuid";
import producers from "../mocks/producers.json";

import { ProducerType } from "@/types";

export const producersSlice = createSlice({
  name: "producers",
  initialState: producers as ProducerType[],
  reducers: {
    createProducer: (state, { payload }) => {
      return [...state, { ...payload, id: generateId() }];
    },
    removeProducer: (state, { payload }) => {
      console.log({ payload });
      return [...state.filter((p) => p.id !== payload.id)];
    },
    updateProducer: (state, { payload }) => {
      return [...state.map((p) => (p.id === payload.id ? payload : p))];
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

export const { createProducer, removeProducer, updateProducer } =
  producersSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
