import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../slice/postSlice";
import getPostsSlice from "../slice/fetchSlice";
export const store = configureStore({
  reducer: {
    posts: postSlice,
    PostsSlice: getPostsSlice,
  },
});
