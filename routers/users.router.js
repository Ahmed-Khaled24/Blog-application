const {Router} = require('express');
const {
    addNewUser,
    getUserById, 
    getAllUsersData,
    getUserPosts,
} = require('../controllers/users.controller')

const usersRouter = Router();

usersRouter.route('/')
.get(getAllUsersData)
.post(addNewUser)

usersRouter.route('/:userId')
.get(getUserById)

usersRouter.route('/:userId/posts')
.get(getUserPosts)


module.exports = usersRouter;