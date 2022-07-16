import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../slice/postSlice";
import getPostsSlice from "../slice/fetchSlice";
import loadingSlice from "../slice/loading";
export const store = configureStore({
  reducer: {
    posts: postSlice,
    PostsSlice: getPostsSlice,
    load: loadingSlice,
  },
});
