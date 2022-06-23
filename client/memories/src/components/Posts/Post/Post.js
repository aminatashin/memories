import React, { useEffect } from "react";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { Paper } from "@material-ui/core";
import { getPosts } from "../../../slice/fetchSlice";

const Post = () => {
  useEffect(() => {
    dispatch(getPosts("http://localhost:5000/memory"));
  }, []);
  const classes = useStyles();
  const posts = useSelector((state) => state.PostsSlice.stock);
  const other = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  console.log(posts);

  return (
    <div>
      <h1>singlePost</h1>
      {posts.map((post) => (
        <h1>{post.title}</h1>
      ))}
      {other.map((post) => (
        <h1>{post.title}</h1>
      ))}
    </div>
  );
};

export default Post;
