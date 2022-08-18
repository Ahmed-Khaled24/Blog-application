const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    createdBy: {
        type: String, // User id who created the post
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    visible:{
        type: Boolean,
        default: true,
    }
});

const Posts = mongoose.model('Post', postSchema);

module.exports = Posts;