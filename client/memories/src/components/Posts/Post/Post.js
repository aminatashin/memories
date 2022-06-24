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
  const posts = useSelector((state) => state.PostsSlice.stock);
  const other = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  console.log(posts);

  return (
    <div>
      <h1>singlePost</h1>
      {other.map((post) => (
        <Card elevation={6}>
          <CardMedia style={{ height: 350 }} image={post.selectedFile} />
          <CardContent>
            <Typography gutterBottom veriant="h5">
              {post.creator}
            </Typography>
            <Typography gutterBottom veriant="h5">
              {post.title}
            </Typography>

            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1">{post.memory}</Typography>
            </Box>
            <Typography gutterBottom veriant="h5">
              {post.tags}
            </Typography>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => window.open(post.web_url)}
              >
                Trip Advisor
              </Button>
              <Button
                size="small"
                color="primary"
                onClick={() => window.open(post.website)}
              >
                website
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Post;
