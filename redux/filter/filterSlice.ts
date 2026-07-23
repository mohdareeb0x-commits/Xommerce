import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type FilterErrorType = "max ls min" | "max 0" | null;

export interface FilterState {
  minPrice: string;
  maxPrice: string;
  category: string;
  applied: boolean;
  error: boolean;
}

const initialState: FilterState = {
  minPrice: "",
  maxPrice: "",
  category: "",
  applied: false,
  error: false,
};

export const chipCattegorySlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setMinPrice: (state, price: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.minPrice = price.payload;
    },
    setMaxPrice: (state, price: PayloadAction<string>) => {
      state.maxPrice = price.payload;
    },
    setCategory: (state, category: PayloadAction<string>) => {
      state.category = category.payload;
    },
    setApply: (state, isApplied: PayloadAction<boolean>) => {
      state.applied = isApplied.payload;
    },
    setError: (state, err: PayloadAction<boolean>) => {
      state.error = err.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMinPrice, setMaxPrice, setCategory, setApply, setError } =
  chipCattegorySlice.actions;

export default chipCattegorySlice.reducer;
