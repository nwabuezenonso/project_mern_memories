import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => {
    const { page } = req.query;     // get the query of the page

    try {
        const LIMIT = 8;         // get the limit of the page variable
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await PostMessage.countDocuments({});  // method to count all document
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex); // find post from newest to oldest and pass the limit and skip to start index

        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});  //pass in data, current page and total number of pages
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

// get post by search function
export const getPostsBySearch = async (req, res) => {
    // retrieve the query
    const { searchQuery, tags } = req.query;

    try {
        // convert to regular expression for mongodb to get data easily  i stand for ignore case
        const title = new RegExp(searchQuery, "i");

        // find the data by tags or title
        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        // send data as response
        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params; // get the post by id

    try {
        const post = await PostMessage.findById(id); // find the post by id
        
        res.status(200).json(post); //send the response
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}



export default router;