import React, { useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";

import { commentPost } from "../../slice/fetchSlice";
import useStyles from "./styles";
const CommentSection = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(postId.comment);
  const classes = useStyles();

  const user = useSelector((state) => state.PostsSlice.user);

  const dispatch = useDispatch();

  const handleComment = async () => {
    const postComment = `${user.name}:${comment}`;
    const newComment = await dispatch(commentPost(postComment, postId._id));

    setComment(newComment);
    setComment("");
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
              <strong>{c.split(": ")[0]}</strong>
              {c.split(":")[1]}
            </Typography>
          ))}
        </div>
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
      </div>
    </div>
  );
};

export default CommentSection;
