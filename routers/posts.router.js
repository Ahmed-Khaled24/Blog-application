const { Router } = require('express');
const {
    getAllVisiblePosts,
    getPost,
    deletePost,
    addNewPost,
} = require('../controllers/posts.controller');
const { checkLoggedIn } = require('../util/auth.util');

const postsRouter = Router();

postsRouter.route('/')
.get(getAllVisiblePosts)
.post(checkLoggedIn, addNewPost);


postsRouter.route('/:postId')
.get(getPost)
.delete(checkLoggedIn, deletePost)


module.exports = postsRouter;
