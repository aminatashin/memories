import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { getPosts } from "../slice/fetchSlice";
import useStyles from "./styles";

const Paginate = ({ page }) => {
  const [loadring, setLoading] = useState(true);
  const numberOfPages = useSelector((state) => state.PostsSlice.numberOfPages);
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    if (page) {
      setLoading(true);
      dispatch(getPosts(page));
      setLoading(false);
    }
  }, [dispatch, page]);

  return loadring ? (
    <CircularProgress />
  ) : (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <Link to={`/posts?page=${item.page}`}>
          <PaginationItem {...item} />
        </Link>
      )}
    />
  );
};

export default Paginate;
