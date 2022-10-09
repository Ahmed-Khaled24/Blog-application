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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    visible:{
        type: Boolean,
        default: true,
    },
    imageUrl: String,
});

const Posts = mongoose.model('Post', postSchema);

module.exports = Posts;