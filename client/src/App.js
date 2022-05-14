// import react and useeffect hooks
import React, { useState, useEffect } from 'react';
// import container and appBar
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
// to dispatch action
import { useDispatch } from 'react-redux';

// impost post component and form component
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
// import get post action to dispatch
import { getPosts } from './actions/posts';
// import styles and 
import useStyles from './styles';
// import images file
import memories from './images/memories.png';

// functional component
const App = () => {
  // create state
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  // load the get post action to make changes
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    // create jsx for data
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              {/* post component with current id passed */}
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              {/* form component with current id and setcurrentid passed */}
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

// export app
export default App;
