import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface SignupState {
  email: string;
  username: string;
  password: string;
}

const initialState: SignupState = {
  email: "",
  username: "",
  password: "",
};

export const signupSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    resetSignUp: (state) => {
      state.username = "";
      state.email = "";
      state.password = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEmail, setUsername, setPassword, resetSignUp } =
  signupSlice.actions;

export default signupSlice.reducer;
