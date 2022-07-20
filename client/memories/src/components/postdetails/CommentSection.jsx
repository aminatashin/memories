import React, { useState, useEffect } from "react";
import { Typography, TextField, Button } from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../slice/fetchSlice";
import { commentPost } from "../../slice/fetchSlice";
import useStyles from "./styles";
const CommentSection = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(postId.comment);
  const classes = useStyles();

  const user = useSelector((state) => state.PostsSlice.user);

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
    setComments(newComment);
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>

          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              {c}
            </Typography>
          ))}
        </div>
        {user.firstName && (
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
