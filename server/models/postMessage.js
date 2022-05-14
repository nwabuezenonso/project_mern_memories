// import mongoose
import mongoose from 'mongoose';

// create scheme
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

// create model based on schema
var PostMessage = mongoose.model('PostMessage', postSchema);

// export post message
export default PostMessage;