import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const getPosts = createAsyncThunk(
  "PostsSlice/getPosts",
  async (url, thunkAPI) => {
    try {
      const res = await fetch(url);
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
