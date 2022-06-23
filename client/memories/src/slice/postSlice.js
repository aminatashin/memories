import { createSlice } from "@reduxjs/toolkit";
const initialState = [
  { id: "1", title: "oskol", content: "iam confused" },
  { id: "2", title: "khar", content: "iam more confused" },
];
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAded: (state, action) => {
      state.push(action.payload);
    },
  },
});
export default postSlice.reducer;
export const { postAded } = postSlice.actions;
