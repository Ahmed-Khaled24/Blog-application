const { Router } = require('express');
const {
    addNewPost, 
    getAllVisiblePosts,
    getPost,
    deletePost,
} = require('../controllers/posts.controller');

const postsRouter = Router();

postsRouter.route('/')
.get(getAllVisiblePosts)
.post(addNewPost)


postsRouter.route('/delete')
.post(deletePost)


postsRouter.route('/:postId')
.get(getPost)


module.exports = postsRouter;
