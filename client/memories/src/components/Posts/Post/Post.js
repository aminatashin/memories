import React, { useEffect } from "react";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";

import { getPosts } from "../../../slice/fetchSlice";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import {
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";

const Post = () => {
  useEffect(() => {
    dispatch(getPosts("http://localhost:5000/memory"));
  }, []);
  const classes = useStyles();
  const fetchPosts = useSelector((state) => state.PostsSlice.stock);
  const posts = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  // return (
  //   <div>
  //     <h1>singlePost</h1>
  //     {fetchPosts.map((post) => (
  //       <Card elevation={6}>
  //         <CardContent>
  //           <Typography gutterBottom veriant="h3">
  //             {post.creator}
  //           </Typography>

  //           <Typography gutterBottom variant="h5">
  //             {post.memory}
  //           </Typography>
  //           <Typography gutterBottom veriant="h4">
  //             {post.title}
  //           </Typography>

  //           <Typography gutterBottom veriant="h5">
  //             {post.tags}
  //           </Typography>
  //           <CardActions>
  //             <Button
  //               size="small"
  //               color="primary"
  //               onClick={() => window.open(post.url)}
  //             >
  //               where was It ?
  //             </Button>
  //             <Button
  //               size="small"
  //               color="primary"
  //               onClick={() => window.open(post.url2)}
  //             >
  //               Any Hotel or Cabin?
  //             </Button>
  //           </CardActions>
  //         </CardContent>
  //       </Card>
  //     ))}
  //     {posts.map((post) => (
  //       <Card elevation={6}>
  //         <CardMedia style={{ height: 350 }} image={post.selectedFile} />
  //         <CardContent>
  //           <Typography gutterBottom veriant="h3">
  //             {post.creator}
  //           </Typography>

  //           <Typography gutterBottom variant="h5">
  //             {post.memory}
  //           </Typography>
  //           <Typography gutterBottom veriant="h4">
  //             {post.title}
  //           </Typography>

  //           <Typography gutterBottom veriant="h5">
  //             {post.tags}
  //           </Typography>
  //           <CardActions>
  //             <Button
  //               size="small"
  //               color="primary"
  //               onClick={() => window.open(post.url)}
  //             >
  //               where was It ?
  //             </Button>
  //             <Button
  //               size="small"
  //               color="primary"
  //               onClick={() => window.open(post.url2)}
  //             >
  //               Any Hotel or Cabin?
  //             </Button>
  //           </CardActions>
  //         </CardContent>
  //       </Card>
  //     ))}
  //   </div>
  // );
  return (
    <div>
      {fetchPosts.map((post) => (
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            title={post.title}
          />
          <div className={classes.overlay}>
            <Typography variant="h6">{post.creator}</Typography>
            <Typography variant="body2">{post.createdAt}</Typography>
          </div>
          <div className={classes.overlay2}>
            <Button style={{ color: "white" }} size="small" onClick={""}>
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
          </div>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {post.title}
          </Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.message}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button size="small" color="primary" onClick={""}>
              <ThumbUpAltIcon fontSize="small" /> Like {post.likeCount}{" "}
            </Button>
            <Button size="small" color="primary" onClick={""}>
              <DeleteIcon fontSize="small" /> Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default Post;
