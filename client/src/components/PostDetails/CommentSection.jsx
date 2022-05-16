// import react and use state
import React, { useState, useRef } from 'react';
// import typography
import { Typography, TextField, Button } from '@material-ui/core/';
// import use dispatch
import { useDispatch } from 'react-redux';

// import comment for post
import { commentPost } from '../../actions/posts'; // import comment section
import useStyles from './styles'; // import use styles for button

// comment component
const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));  // get data from user storage
  const [comment, setComment] = useState(''); // state for setting comment
  const dispatch = useDispatch(); // use dispatch for dispatching an action
  const [comments, setComments] = useState(post?.comments); // comment state
  const classes = useStyles(); // use styles
  const commentsRef = useRef(); //  for scroll behavior

  // handle comment function for handling comment
  const handleComment = async () => {
    const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id)); // dispatch the comment with the comment and the id of the post

    setComment(''); // set comment to be empty
    setComments(newComments); 

    commentsRef.current.scrollIntoView({ behavior: 'smooth' }); // for scrolling
  };

  // JSX created for comment
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(': ')[0]}</strong> 
              {c.split(':')[1]}
            </Typography>
          ))}
          {/* specify anchor point */}
          <div ref={commentsRef} /> 
        </div>
        <div style={{ width: '70%' }}>
          <Typography gutterBottom variant="h6">Write a comment</Typography>
          <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
          <br />
          <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
