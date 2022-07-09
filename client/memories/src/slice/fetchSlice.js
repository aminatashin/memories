import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const Url = "http://localhost:5000/memory";
export const getPosts = createAsyncThunk(
  "PostsSlice/getPosts",
  async (Url, thunkAPI) => {
    try {
      const res = await fetch(Url);
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return thunkAPI.rejectWithValue;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue;
    }
  }
);
const getPostsSlice = createSlice({
  name: "PostsSlice",
  initialState: {
    stock: [],
  },
  reducer: {},
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      return {
        ...state,
      };
    },
    [getPosts.fulfilled]: (state, action) => {
      return {
        ...state,
        stock: action.payload,
      };
    },
    [getPosts.rejected]: (state, action) => {
      return {
        ...state,
      };
    },
  },
});
export default getPostsSlice.reducer;
export const { addPosts } = getPostsSlice.actions;
