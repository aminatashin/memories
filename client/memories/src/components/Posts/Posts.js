import React from "react";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

import Post from "../Posts/Post/Post";
const Posts = ({ setCurrentId }) => {
  // ==================================================

  // ==================================================

  const fetchPosts = useSelector((state) => state.PostsSlice.stock);
  const classes = useStyles();
  // ==================================================
  return !fetchPosts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {fetchPosts.map((post) => (
        <Grid item xs={12} sm={6} md={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
