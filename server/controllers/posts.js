// import express from express
import express from 'express';
// import mongoose
import mongoose from 'mongoose';

// import postMessage from postMessage
import PostMessage from '../models/postMessage.js';

const router = express.Router();

// export getpost function for getting all post
export const getPosts = async (req, res) => { 
    try {
        // Go to the database and get all post
        const postMessages = await PostMessage.find();
        
        // Send the post response
        res.status(200).json(postMessages);
    } catch (error) {
        // if error send the error as json
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// export createpost function for creating post
export const createPost = async (req, res) => {
    // receive set of data from the client
    const { title, message, selectedFile, creator, tags } = req.body;

    // send the data to model
    const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })

    try {
        // save the data to the database
        await newPostMessage.save();

        // send the response back to the client
        res.status(201).json(newPostMessage );
    } catch (error) {
        // if error send error
        res.status(409).json({ message: error.message });
    }
}

// exporting updatepost function
export const updatePost = async (req, res) => {
    // get the id
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

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
}


export default router;