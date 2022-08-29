const { Router } = require('express');
const {
    getAllVisiblePosts,
    getPost,
    deletePost,
} = require('../controllers/posts.controller');

const postsRouter = Router();

postsRouter.route('/')
.get(getAllVisiblePosts)


postsRouter.route('/delete')
.post(deletePost)


postsRouter.route('/:postId')
.get(getPost)


module.exports = postsRouter;
