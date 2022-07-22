import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser, getPostId } from "../../slice/fetchSlice";
import { commentPost } from "../../slice/fetchSlice";
import useStyles from "./styles";
const CommentSection = ({ postId }) => {
  const [comment, setComment] = useState("");
  // const [comments, setComments] = useState(postId.comments);
  const classes = useStyles();
  const { id: _id } = useParams();
  const user = useSelector((state) => state.PostsSlice.user);
  const postIdLoading = useSelector((state) => state.PostsSlice.loading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());

    console.log(postId.comment);
  }, []);
  const handleComment = async () => {
    const postComment = `${user.firstName}:${comment}`;
    const newComment = await dispatch(
      commentPost({ comment: postComment, id: postId._id })
    );
    setComment("");
    //setComment(newComment);
    dispatch(getPostId(_id));
  };

  console.log("POST COMMENTS", postId.comments);

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>

          {/* {comments?.map((c, i) => ( */}
          <Typography gutterBottom variant="subtitle1">
            {postIdLoading ? (
              <CircularProgress />
            ) : (
              postId.comments && postId.comments.map((c) => <div>{c}</div>)
            )}
          </Typography>
          {/* ))} */}
        </div>
        {user?.firstName && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <br />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment.length}
              color="primary"
              variant="contained"
              onClick={handleComment}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
