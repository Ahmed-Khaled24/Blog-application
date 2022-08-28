const {Router} = require('express');
const {checkLoggedIn} = require('../util/auth.util');
const {
    renderComposePage,
    addNewPost,
} = require('../controllers/compose.controller');

const composeRouter = Router();

composeRouter.route('/')
.get(checkLoggedIn, renderComposePage)
.post(checkLoggedIn, addNewPost)

module.exports = composeRouter;