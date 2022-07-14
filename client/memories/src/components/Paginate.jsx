import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";

import { getPosts } from "../slice/fetchSlice";
import useStyles from "./styles";

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.PostsSlice.stock);
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [dispatch, page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={5}
      page={1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <Link to={`"/posts/page?${1}`}>
          <PaginationItem {...item} />
        </Link>
      )}
    />
  );
};

export default Paginate;
