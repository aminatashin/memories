import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// ===============================================
export const addFetchPost = createAsyncThunk("posts/addFetchPost", async () => {
  const res = await fetch("http://localhost:5000/memory");
  if (res.ok) {
    const data = await res.json();
    return data;
  }
});

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
