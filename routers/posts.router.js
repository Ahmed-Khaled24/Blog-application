const { Router } = require('express');
const {
    addNewPost, 
    getAllVisiblePosts,
    getPost,
} = require('../controllers/posts.controller');

const postsRouter = Router();

postsRouter.route('/')
.get(getAllVisiblePosts)
.post(addNewPost)


postsRouter.route('/:postId')
.get(getPost)


module.exports = postsRouter;
