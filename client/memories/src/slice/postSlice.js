import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "pots",
  initialState: [
    {
      title: "",
      message: "",
      creator: "",
      tags: "",
      selectedFile: "",
    },
  ],
  reducers: {
    postAded: (state, action) => {
      state.push(action.payload);
    },
  },
});
export default postSlice.reducer;
export const { postAded } = postSlice.actions;
