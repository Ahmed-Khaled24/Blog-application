const {
    db_addNewUser,
    db_getUserData,
    db_getAllUsersData,
} = require('../models/users/users.model');
const {
    validateUserInitialData,
} = require('../util/users.util');
const {
    generatePassword,
    verifyPassword,
} = require('../util/password.util');


async function addNewUser(req, res){  
    const{isValid, validationMessage} = validateUserInitialData(req.body);
    if(!isValid){
        return res.status(400).json({
            error: validationMessage,
        })
    }
    const{hashPassword, salt} = generatePassword(req.body.password);
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        salt: salt,
        userSource: 'Local',
        registerDate: Date(),
        active: true
    }
    try{
        const newUser = await db_addNewUser(user);
        return res.status(201).json({
            success: "user created successfully",
            user: {
                username: newUser.username,
                id: newUser.id
            },
        })
    } catch(err){
        return res.status(500).json({
            error: err.message
        })
    }
}

async function getUserData(req, res){
    const userId = req.params.id;
    try{
        const user = await db_getUserData(userId);
        if(user) {
            return res.status(200).json(user);
        } else {
            return res.status(200).json({
                error: 'No user found',
            });
        }
    } catch(err){
        res.status(500).json(err.message);
    }
}

async function getAllUsersData(req, res){
    try{
        const allUsers = await db_getAllUsersData();
        return res.status(200).json(allUsers);
    } catch(err){
        return res.status(400).json({
            error: err.message,
        })
    }
}

module.exports = {
    addNewUser, 
    getUserData,
    getAllUsersData,
}