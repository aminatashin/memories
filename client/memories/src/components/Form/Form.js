import React, { useState } from "react";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase64 from "react-file-base64";

import { postAded } from "../../slice/postSlice";
const Form = () => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    memory: "",
    tags: "",
    url: "",
    url2: "",
    selectedFile: "",
  });

  const dispatch = useDispatch();
  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postAded(postData));
    setPostData({
      creator: "",
      title: "",
      memory: "",
      tags: "",
      url: "",
      url2: "",
      selectedFile: "",
    });
  };
  const canSubmit =
    Boolean(postData.creator) &&
    Boolean(postData.title) &&
    Boolean(postData.memory) &&
    Boolean(postData.tags) &&
    Boolean(postData.selectedFile);
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Create A MEMORY!</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="memory"
          fullWidth
          value={postData.messgae}
          onChange={(e) => setPostData({ ...postData, memory: e.target.value })}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <TextField
          name="url"
          variant="outlined"
          label="URL"
          placeholder="The Place"
          fullWidth
          value={postData.url}
          onChange={(e) => setPostData({ ...postData, url: e.target.value })}
        />
        <TextField
          name="url2"
          variant="outlined"
          label="URL2"
          placeholder="The Hotel or cabin"
          fullWidth
          value={postData.url2}
          onChange={(e) => setPostData({ ...postData, url2: e.target.value })}
        />
        <div className={classes.fileInput}>
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          disabled={!canSubmit}
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
