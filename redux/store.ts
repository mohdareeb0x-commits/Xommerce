import { configureStore } from "@reduxjs/toolkit";
import healthCheckReducer from "./apiHealthCheck/healthCheckSlice";
import categoryReducer from "./category/categorySlice";
import chipCattegoryReducer from "./chipCattegory/chipCattegorySlice";
import filterReducer from "./filter/filterSlice";
import signinReducer from "./signIn/signinSlice";
import signupReducer from "./signup/signupSlice";

export const store = configureStore({
  reducer: {
    chipCattegory: chipCattegoryReducer,
    healthCheckReducer: healthCheckReducer,
    filter: filterReducer,
    category: categoryReducer,
    signup: signupReducer,
    signin: signinReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
