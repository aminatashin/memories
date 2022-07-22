import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  Button,
  TextField,
} from "@material-ui/core";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./styles";
import { useNavigate, useLocation } from "react-router-dom";
import { getPostsSearch, getUser } from "../../slice/fetchSlice";

import Paginate from "../Paginate";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = ({ currentId, setCurrentId, user }) => {
  // user is the currently loggedin user
  // user contains the like array
  // which holds the ids of the posts he previously liked
  const [search, setSearch] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  // const querySearch = useSelector((state) => state.PostsSlice.search);
  // =========================================

  // =========================================
  useEffect(() => {
    dispatch(getUser());
  }, []);
  // =========================================
  const searchPost = () => {
    if (search.trim()) {
      dispatch(getPostsSearch(search));

      navigate(`/posts/search?searQuery=${search || "none"}`);
    } else {
      navigate("/");
    }
  };
  const handlekeyPress = (e) => {
    if (e.KeyCode === 13) {
      searchPost();
    }
  };

  return (
    <>
      <Grow in>
        <Container maxWidth="xl">
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
            className={classes.mainContainer}
          >
            <Grid item xs={12} sm={6} md={9}>
              <Posts
                currentId={currentId}
                setCurrentId={setCurrentId}
                search={search}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar
                className={classes.appBarSearch}
                position="static"
                color="inherit"
              >
                <TextField
                  onKeyDown={handlekeyPress}
                  name="search"
                  variant="outlined"
                  label="Search Memories"
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <Button
                  onClick={searchPost}
                  className={classes.searchButton}
                  variant="contained"
                  color="primary"
                >
                  Search
                </Button>
              </AppBar>

              <Form currentId={currentId} setCurrentId={setCurrentId} />
              {/* {!searchQuery && (
                <Paper elevation={6} className={classes.pagination}>
                  <Paginate page={page} />
                </Paper>
              )} */}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default Home;
