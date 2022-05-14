// importing express to handle our routes
import express from 'express';

// import controller to the route file
import { getPosts, getPost, createPost, updatePost, likePost, deletePost } from '../controllers/posts.js';

// call the express router function
const router = express.Router();

// create routes for evey controller
router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);

// export routes
export default router;