import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface SigninState {
  email: string;
  password: string;
}

const initialState: SigninState = {
  email: "",
  password: "",
};

export const signinSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    resetSignIn: (state) => {
      state.password = "";
      state.email = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEmail, setPassword, resetSignIn } = signinSlice.actions;

export default signinSlice.reducer;
