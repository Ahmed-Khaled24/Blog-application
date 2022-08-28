const {Router} = require('express');
const {checkLoggedIn} = require('../util/auth.util');
const{
    renderMyPostsPage,
    deleteUserPost,
} = require('../controllers/my-posts.controller')

const myPostsRouter = Router();

myPostsRouter.route('/')
.get(checkLoggedIn, renderMyPostsPage);

myPostsRouter.route('/delete-post')
.post(checkLoggedIn, deleteUserPost);



module.exports = myPostsRouter;