import { createSlice } from "@reduxjs/toolkit";
const loadingSlice = createSlice({
  name: "load",
  initialState: {
    loading: false,
  },
  reducers: {
    isLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
});
export default loadingSlice.reducer;
export const { isLoading } = loadingSlice.actions;
