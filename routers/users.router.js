const {Router} = require('express');
const {
    addNewUser,
    getUserData, 
    getAllUsersData,
} = require('../controllers/users.controller')

const usersRouter = Router();

usersRouter.route('/')
.get(getAllUsersData)
.post(addNewUser)

usersRouter.route('/:id')
.get(getUserData)


module.exports = usersRouter;