import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type ChipCategoryType =
  "All" | "Laptops" | "Phones" | "Audio" | "Cameras" | "Smart Home";

export interface ChipCategoryState {
  value: ChipCategoryType;
  seeAll: boolean;
}

const initialState: ChipCategoryState = {
  value: "All",
  seeAll: false,
};

export const chipCattegorySlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    toggle: (state, category: PayloadAction<ChipCategoryType>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = category.payload;
    },
    toggleSeeAll: (state, toSet: PayloadAction<boolean>) => {
      state.seeAll = toSet.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggle, toggleSeeAll } = chipCattegorySlice.actions;

export default chipCattegorySlice.reducer;
