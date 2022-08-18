const {
    db_addNewUser,
    db_getUserData,
    db_getAllUsersData,
} = require('../models/users/users.model');

async function addNewUser(req, res){

    if(!req.body.username){
        return res.status(400).json({error: 'username is missing'});
    } else if(!req.body.email){
        return res.status(400).json({error: 'email is missing'});
    } else if(!req.body.password){
        return res.status(400).json({error: 'password is missing'});
    }

    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        userSource: 'Local',
        registerDate: Date(),
        active: true
    }

    try{
        await db_addNewUser(user);
        return res.status(201).json({
            success: "user created successfully"
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