import React, { useState } from "react";
import useStyles from "./styles";
import moment from "moment";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import {
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { removePost, like } from "../../../slice/postSlice";
import { Link } from "react-router-dom";
// ==================================================
const Post = ({ post, setCurrentId }) => {
  const [likes, setLikes] = useState(post?.likes);
  const classes = useStyles();
  const user = useSelector((state) => state.PostsSlice.user);

  // ==================================================
  const dispatch = useDispatch();
  // ==================================================
  const hasLikedPost = post.likes.find((like) => like === user._id);
  const handleLike = async () => {
    dispatch(like(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== user._id));
    } else {
      setLikes([...post.likes, user._id]);
    }
  };
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === user._id) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  // ==================================================
  return (
    <Card className={classes.card} raised elevation={6}>
      <Link to={`/posts/${post._id}`}>
        <CardMedia
          className={classes.media}
          image={
            post.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={post.title}
        />
      </Link>
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {user?._id === post.creator && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
      )}
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
          {post.memory}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.url}
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user._id}
          onClick={handleLike}
        >
          <Likes />
        </Button>

        {user?._id === post.creator && (
          <Button
            size="small"
            color="secondary"
            onClick={() => dispatch(removePost(post._id))}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
