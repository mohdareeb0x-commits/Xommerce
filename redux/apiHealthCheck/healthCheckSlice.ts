import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface HealthCheckState {
  isApiUp: boolean | null;
}

const initialState: HealthCheckState = {
  isApiUp: true,
};

export const healthCheckSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    changeApiState: (state, health: PayloadAction<boolean>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isApiUp = health.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeApiState } = healthCheckSlice.actions;

export default healthCheckSlice.reducer;
