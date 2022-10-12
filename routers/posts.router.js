const { Router } = require('express');
const {
    getAllVisiblePosts,
    getPost,
    deletePost,
    addNewPost,
} = require('../controllers/posts.controller');
const  checkLoggedIn  = require('../middlewares/checkLoggedIn');

const postsRouter = Router();

postsRouter.route('/')
.get(getAllVisiblePosts)
.post(checkLoggedIn, addNewPost)
.delete(checkLoggedIn, deletePost)

postsRouter.route('/:postId')
.get(getPost)



module.exports = postsRouter;
