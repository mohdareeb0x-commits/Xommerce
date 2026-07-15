import { configureStore } from "@reduxjs/toolkit";
import fillReducer from "./fill/fillSlice";

export const store = configureStore({
  reducer: {
    fill: fillReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
