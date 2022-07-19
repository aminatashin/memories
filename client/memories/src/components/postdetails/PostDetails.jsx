import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";

import { getPostId, getPostsSearch } from "../../slice/fetchSlice";

import useStyles from "./styles";
import CommentSection from "./CommentSection";
const PostDetails = ({ search }) => {
  const postId = useSelector((state) => state.PostsSlice.postId);
  const fetchPosts = useSelector((state) => state.PostsSlice.stock);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id: _id } = useParams();

  useEffect(() => {
    dispatch(getPostId(_id));
    console.log(postId.likes);
  }, [_id]);

  // useEffect(() => {
  //   if (postId) {
  //     dispatch(getPostsSearch({ search: postId.title }));
  //   }
  // }, [postId]);

  //if (!postId) return null;

  const openPost = (_id) => navigate(`/posts/${_id}`);

  const recommendedPosts = fetchPosts.filter(({ _id }) => _id !== postId._id);
  const likedPosts = fetchPosts.filter((post) => {
    console.log("!!!", post.likes);
    console.log(_id);
    return post.includes((id) => id === post.likes);
  });

  return !postId ? (
    <CircularProgress />
  ) : (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {postId.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {postId.tags}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {postId.memory}
          </Typography>
          <Typography variant="h6">Created by: {postId.name}</Typography>
          <Typography variant="body1">
            {moment(postId.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />

          <CommentSection postId={postId} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              postId.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={postId.title}
          />
        </div>
      </div>

      {likedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {likedPosts.map(
              ({ title, name, memory, likes, selectedFile, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {memory}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                  <img src={selectedFile} alt="userpic" width="200px" />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
