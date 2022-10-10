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
.patch(updateUser)

usersRouter.route('/:userId')
.get(getUserById)

usersRouter.route('/:userId/posts')
.get(getUserPosts)


module.exports = usersRouter;