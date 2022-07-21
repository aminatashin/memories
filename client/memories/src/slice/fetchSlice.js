import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ================================================
const Url = "http://localhost:5000/memory";

export const getPosts = createAsyncThunk(
  "PostsSlice/getPosts",
  async (page, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:5000/memory?page=${page}`);
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

export const getPostId = createAsyncThunk(
  "PostsSlice/getPostId",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:5000/memory/` + id);
      if (res.ok) {
        const data = await res.json();
        // thunkAPI.dispatch(getPosts());
        return data;
      } else {
        return thunkAPI.rejectWithValue;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue;
    }
  }
);
export const getPostsSearch = createAsyncThunk(
  "PostsSlice/getPostsSearch",
  async (searchQuery, thunkAPI) => {
    try {
      const res = await fetch(
        `http://localhost:5000/memory/search/` + searchQuery.search
      );
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

export const commentPost = createAsyncThunk(
  "PostsSlice/commentPost",
  async ({ comment, id }, thunkAPI) => {
    console.log(comment);
    const res = await fetch(`http://localhost:5000/memory/comment/` + id, {
      method: "POST",
      body: JSON.stringify({ comment }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });
    if (res.ok) {
      thunkAPI.dispatch(getPosts());
      return comment;
    } else {
      console.log(`from post comment redux${Error}`);
    }
  }
);
const getPostsSlice = createSlice({
  name: "PostsSlice",
  initialState: {
    stock: [],
    user: {},
    search: {},
    currentPage: {},
    numberOfPages: {},
    loading: true,
    postId: [],
    comment: [],
  },
  reducer: {
    isLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload,
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
        stock: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
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
    [getPostsSearch.fulfilled]: (state, action) => {
      return {
        ...state,
        search: action.payload,
      };
    },
    [getPostId.fulfilled]: (state, action) => {
      return {
        ...state,
        postId: action.payload,
      };
    },
    [commentPost.fulfilled]: (state, action) => {
      return {
        ...state,
        comment: action.payload,
      };
    },
  },
});

export default getPostsSlice.reducer;
