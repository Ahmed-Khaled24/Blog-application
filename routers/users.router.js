const {Router} = require('express');
const {
    addNewUser,
    getUserData, 
    getAllUsersData,
    getUserPosts,
} = require('../controllers/users.controller')

const usersRouter = Router();

usersRouter.route('/')
.get(getAllUsersData)
.post(addNewUser)

usersRouter.route('/:userId')
.get(getUserData)

usersRouter.route('/:userId/posts')
.get(getUserPosts)


module.exports = usersRouter;