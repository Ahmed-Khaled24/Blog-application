const { Router } = require('express');
const {
    addNewPost, 
    getAllVisiblePosts,
    getUserPosts,
} = require('../controllers/posts.controller');

const postsRouter = Router();

postsRouter.route('/')
.get(getAllVisiblePosts)
.post(addNewPost)


postsRouter.route('/:userId')
.get(getUserPosts)


module.exports = postsRouter;
