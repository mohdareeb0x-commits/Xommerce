import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// export type ChipCategoryType =

export interface FilterState {
  minPrice: string;
  maxPrice: string;
  category: string;
}

const initialState: FilterState = {
  minPrice: "",
  maxPrice: "",
  category: "",
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
  },
});

// Action creators are generated for each case reducer function
export const { setMinPrice, setMaxPrice, setCategory } =
  chipCattegorySlice.actions;

export default chipCattegorySlice.reducer;
