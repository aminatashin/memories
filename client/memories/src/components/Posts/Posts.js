import React from "react";
import useStyles from "./styles";
import Post from "../Posts/Post/Post";
const Posts = () => {
  const classes = useStyles();
  return (
    <div>
      <h1>Posts</h1>
      <Post />
    </div>
  );
};

export default Posts;