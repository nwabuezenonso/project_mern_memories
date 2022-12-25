import express from "express";
import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js"; // import postMessage from postMessage

const router = express.Router();

// export getpost function for getting all post
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find(); // Go to the database and get all post

    res.status(200).json(postMessages); // Send the post response
  } catch (error) {
    res.status(404).json({ message: error.message }); // if error send the error as json
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// export createpost function for creating post
export const createPost = async (req, res) => {
  const { title, message, selectedFile, creator, tags } = req.body; // receive set of data from the client

  // send the data to model
  const newPostMessage = new PostMessage({
    title,
    message,
    selectedFile,
    creator,
    tags,
  });

  try {
    await newPostMessage.save(); // save the data to the database
    res.status(201).json(newPostMessage); // send the response back to the client
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// exporting updatepost function
export const updatePost = async (req, res) => {
  // get the id
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  //  check if the mongoose id is a valid one
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  // then update post
  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  // send response
  res.json(updatedPost);
};

// deletepost function
export const deletePost = async (req, res) => {
  // recieve the id
  const { id } = req.params;

  // check if it is a valid id
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  // delete the post
  await PostMessage.findByIdAndRemove(id);

  // send a response message
  res.json({ message: "Post deleted successfully." });
};

// functional component to like post
export const likePost = async (req, res) => {
  // get the params from the string
  const { id } = req.params;

  // check if the id is a valid mogodb id
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  // find the post by id
  const post = await PostMessage.findById(id);

  // add the data for user to like the post
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );

  //  return updated data
  res.json(updatedPost);
};

export default router;
