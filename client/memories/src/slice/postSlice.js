import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    postAded: (state, action) => {
      state.push(action.payload);
    },
  },
});
export default postSlice.reducer;
export const { postAded } = postSlice.actions;
