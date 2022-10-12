const {Router} = require('express');
const {
    addNewUser,
    getUserById, 
    getAllUsersData,
    getUserPosts,
    updateUser,
} = require('../controllers/users.controller')
const  checkLoggedIn  = require('../middlewares/checkLoggedIn');


const usersRouter = Router();

usersRouter.route('/')
.get(getAllUsersData)
.post(addNewUser)
.patch(checkLoggedIn, updateUser)

usersRouter.route('/:userId')
.get(getUserById)

usersRouter.route('/:userId/posts')
.get(getUserPosts)


module.exports = usersRouter;