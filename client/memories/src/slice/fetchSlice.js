import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const Url = "http://localhost:5000/memory";
export const getPosts = createAsyncThunk(
  "PostsSlice/getPosts",
  async (Url, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:5000/memory");
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
export const getUser = createAsyncThunk(
  "PostsSlice/getUser",
  async (thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:5000/usermemory/signup/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      if (res.ok) {
        const user = await res.json();
        return user;
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
    stock: {},
    user: {},
  },
  reducer: {
    postRemove: (state, action) => {
      return {
        ...state,
        stock: state.stock.find((p, i) => i !== action.payload),
      };
    },
  },

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
    [getUser.fulfilled]: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
  },
});
export default getPostsSlice.reducer;
