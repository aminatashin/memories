import React from "react";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

import Post from "../Posts/Post/Post";
const Posts = ({ setCurrentId, currentId, search }) => {
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
      {fetchPosts
        .filter((p) => p.title.includes(search))
        .map((post) => (
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <Post
              post={post}
              currentId={currentId}
              setCurrentId={setCurrentId}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default Posts;
