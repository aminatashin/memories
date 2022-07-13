import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";

import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase64 from "react-file-base64";
import { getPosts } from "../../slice/fetchSlice";

// ============================================
const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    memory: "",
    tags: "",
    url: "",
    url2: "",
    selectedFile: "",
  });

  // ============================================

  const fetchPosts = useSelector((state) =>
    currentId ? state.PostsSlice.stock.find((p) => p._id === currentId) : null
  );
  const user = useSelector((state) => state.PostsSlice.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if (fetchPosts) {
      setPostData(fetchPosts);
    }
  }, [fetchPosts]);

  const classes = useStyles();
  // ============================================
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      fetchPut();
    } else {
      fetchPost();
    }

    clear();
  };
  // ============================================

  const fetchPost = async () => {
    const res = await fetch(`http://localhost:5000/memory`, {
      method: "POST",
      body: JSON.stringify({ ...postData, name: user.firstName }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });
    if (res.ok) {
      alert("successfully added the Beautiful Memory!");
      // here you should re-fetch the memories!
      dispatch(getPosts());
    }
  };

  const fetchPut = async () => {
    try {
      const res = await fetch(`http://localhost:5000/memory/` + currentId, {
        method: "PUT",
        body: JSON.stringify({ ...postData, name: user.firstName }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      if (res.ok) {
        alert("successfully edited the Memory!");
        dispatch(getPosts());
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ============================================

  const canSubmit =
    Boolean(postData.title) &&
    Boolean(postData.memory) &&
    Boolean(postData.tags) &&
    Boolean(postData.selectedFile);
  // ============================================
  const clear = () => {
    setPostData(null);
    setPostData({
      title: "",
      memory: "",
      tags: "",
      url: "",
      url2: "",
      selectedFile: "",
    });
  };
  // ============================================
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Create"} A MEMORY!
        </Typography>

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
          value={postData.memory}
          onChange={(e) => setPostData({ ...postData, memory: e.target.value })}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
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
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
