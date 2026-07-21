import { configureStore } from "@reduxjs/toolkit";
import healthCheckReducer from "./apiHealthCheck/healthCheckSlice";
import chipCattegoryReducer from "./chipCattegory/chipCattegorySlice";

export const store = configureStore({
  reducer: {
    chipCattegory: chipCattegoryReducer,
    healthCheckReducer: healthCheckReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
