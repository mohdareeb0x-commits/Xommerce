import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type CategoryMapType = {
  [k: string]: string;
};

export interface CategoryState {
  categoryMap: CategoryMapType;
}

const initialState: CategoryState = {
  categoryMap: {},
};

export const chipCattegorySlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCategoryMap: (state, catMap: PayloadAction<CategoryMapType>) => {
      state.categoryMap = catMap.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryMap } = chipCattegorySlice.actions;

export default chipCattegorySlice.reducer;
