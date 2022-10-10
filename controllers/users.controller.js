const {
    db_addNewUser,
    db_getUserById,
    db_getAllUsersData,
    db_getUserPosts,
    db_updateUser,
} = require('../models/users/users.model');
const { validateUserInitialData } = require('../util/users.util');
const { encryptPassword } = require('../util/password.util');


async function addNewUser(req, res){  
    const{ isValid, validationMessage } = validateUserInitialData(req.body);
    if(!isValid){
        return res.status(400).json({
            status: 'fail',
            message: validationMessage,
        })
    }

    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: await encryptPassword(req.body.password),
        registerDate: Date(),
    }

    try {
        const newUser = await db_addNewUser(user);
        return res.status(201).json({
            status: 'success',
            user: newUser,
        })
    } catch(err) {
        return res.status(500).json({
            status: 'fail',
            message: err.message
        })
    }
}

async function getUserById(req, res){
    const userId = req.params.userId;
    try{
        const user = await db_getUserById(userId);
        if(user) {
            return res.status(200).json({
                status: 'success',
                user,
            });
        } else {
            return res.status(200).json({
                error: 'No user found',
            });
        }
    } catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
}

async function getAllUsersData(req, res){
    try{
        const allUsers = await db_getAllUsersData();
        return res.status(200).json({
            status: 'success',
            allUsers,
        });
    } catch(err){
        return res.status(400).json({
            status: 'fail',
            message: err.message,
        })
    }
}

async function getUserPosts(req, res){
    const userId = req.params.userId;
    try{
        const posts = await db_getUserPosts(userId);
        return res.status(200).json({
            status: 'success',
            posts,
        });
    } catch(err){
        return res.status(500).json({
            status: 'fail',
            message: err.message,
        })
    }
}

async function updateUser(req, res) {
    const update = req.body.update  // update object {property: newValue}
    const filter = { _id: req.user.id };
    try {
        await db_updateUser(filter, update); 
        return res.status(200).json({
            status: 'success'
        });
    } catch(err) {
        return res.status(500).json({
            status: 'fail',
            message: err.message,
        })
    }
}


module.exports = {
    addNewUser, 
    getUserById,
    getAllUsersData,
    getUserPosts,
    updateUser,
}