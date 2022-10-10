const {Router} = require('express');
const {
    addNewUser,
    getUserById, 
    getAllUsersData,
    getUserPosts,
    updateUser,
} = require('../controllers/users.controller')

const usersRouter = Router();

usersRouter.route('/')
.get(getAllUsersData)
.post(addNewUser)

usersRouter.route('/:userId')
.get(getUserById)
.patch(updateUser)

usersRouter.route('/:userId/posts')
.get(getUserPosts)


module.exports = usersRouter;