import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link, useNavigate } from "react-router-dom";

import { getPosts } from "../slice/fetchSlice";
import useStyles from "./styles";

const Paginate = ({ page }) => {
  const numberOfPages = useSelector((state) => state.PostsSlice.numberOfPages);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const classes = useStyles();

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [dispatch, page]);

  return (
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
