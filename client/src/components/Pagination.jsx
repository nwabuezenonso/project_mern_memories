/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
// import use selector and dispatch
import { useDispatch, useSelector } from 'react-redux';
// import pagination and pagination item
import { Pagination, PaginationItem } from '@material-ui/lab';
// import link
import { Link } from 'react-router-dom';

// import getpost actions
import { getPosts } from '../actions/posts';
import useStyles from './styles';

const Paginate = ({ page }) => {
  // get the number of post from the state.posts 
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const classes = useStyles();

  // use effect to get page (dispatch)
  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [dispatch, page]);
  // number of pages and current page
  // item for genrating data from each pahe
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;
