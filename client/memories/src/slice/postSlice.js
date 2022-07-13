import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { getPosts } from "./fetchSlice";
// ===============================================

export const removePost = createAsyncThunk(
  "posts/removePost",
  async (initialState) => {
    const id = initialState;
    const res = await fetch(`http://localhost:5000/memory/delete/` + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });
    if (res.ok) {
      useDispatch(getPosts());

      return initialState;
    } else {
      console.log(Error);
    }
  }
);

const postData = {
  creator: "",
  title: "",
  memory: "",
  tags: "",
  url: "",
  url2: "",
  selectedFile: "",
  likeCount: null,
};
export const like = createAsyncThunk("posts/like", async (initialState) => {
  const id = initialState;
  const res = await fetch(`http://localhost:5000/memory/like/` + id, {
    method: "PUT",
    // body: JSON.stringify(postData.likeCount),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
  if (res.ok) {
    const dispatch = useDispatch();
    dispatch(getPosts());
    return postData;
  } else {
    console.log(Error);
  }
});

const postSlice = createSlice({
  name: "posts",
  initialState: {
    postData,
  },
  reducers: {},
  extraReducers: {
    [removePost.pending]: (state, action) => {
      return {
        ...state,
      };
    },
    [removePost.fulfilled]: (state, action) => {
      return {
        ...state,
        state: state.filter((p, i) => i !== action.payload),
      };
    },
    [removePost.rejected]: (state, action) => {
      return {
        ...state,
      };
    },
    [like.fulfilled]: (state, action) => {
      return {
        postData: state.postData.map((p, i) =>
          i === action.payload ? action.payload : p
        ),
      };
    },
  },
});
export default postSlice.reducer;
