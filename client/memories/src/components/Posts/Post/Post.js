import React, { useEffect } from "react";
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
  ButtonBase,
} from "@material-ui/core";
import { removePost, like } from "../../../slice/postSlice";
import { useNavigate } from "react-router-dom";
// ==================================================
const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const user = useSelector((state) => state.PostsSlice.user);
  const navigate = useNavigate();
  // ==================================================
  const dispatch = useDispatch();
  // ==================================================
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === user?._id) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
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
  const handlepostPage = () => {
    navigate(`/posts/${post._id}`);
  };
  // ==================================================
  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.B} onClick={handlepostPage}>
        <CardMedia
          className={classes.media}
          image={
            post.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={post.title}
        />
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
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user._id}
          onClick={() => dispatch(like(post._id))}
        >
          <Likes />
        </Button>
        {user?._id === post.creator && (
          <Button
            size="small"
            color="primary"
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
