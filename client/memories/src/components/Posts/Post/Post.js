import React, { useEffect } from "react";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { Paper } from "@material-ui/core";
import { getPosts } from "../../../slice/fetchSlice";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";

const Post = () => {
  useEffect(() => {
    dispatch(getPosts("http://localhost:5000/memory"));
  }, []);
  const classes = useStyles();
  const fetchPosts = useSelector((state) => state.PostsSlice.stock);
  const posts = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  return (
    <div>
      <h1>singlePost</h1>
      {fetchPosts.map((post) => (
        <Card elevation={6}>
          <CardContent>
            <Typography gutterBottom veriant="h3">
              {post.creator}
            </Typography>

            <Typography gutterBottom variant="h5">
              {post.memory}
            </Typography>
            <Typography gutterBottom veriant="h4">
              {post.title}
            </Typography>

            <Typography gutterBottom veriant="h5">
              {post.tags}
            </Typography>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => window.open(post.url)}
              >
                where was It ?
              </Button>
              <Button
                size="small"
                color="primary"
                onClick={() => window.open(post.url2)}
              >
                Any Hotel or Cabin?
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      ))}
      {posts.map((post) => (
        <Card elevation={6}>
          <CardMedia style={{ height: 350 }} image={post.selectedFile} />
          <CardContent>
            <Typography gutterBottom veriant="h3">
              {post.creator}
            </Typography>

            <Typography gutterBottom variant="h5">
              {post.memory}
            </Typography>
            <Typography gutterBottom veriant="h4">
              {post.title}
            </Typography>

            <Typography gutterBottom veriant="h5">
              {post.tags}
            </Typography>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => window.open(post.url)}
              >
                where was It ?
              </Button>
              <Button
                size="small"
                color="primary"
                onClick={() => window.open(post.url2)}
              >
                Any Hotel or Cabin?
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Post;
