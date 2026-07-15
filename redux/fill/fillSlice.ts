import { createSlice } from "@reduxjs/toolkit";

export interface FillState {
  value: boolean;
}

const initialState: FillState = {
  value: false,
};

export const fillSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    toggle: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggle } = fillSlice.actions;

export default fillSlice.reducer;
