const Users = require('./users.mongo');

async function db_addNewUser(user){
    try{
        await Users.create(user);
    } catch(err){
        throw err;
    }
}

async function db_getUserData(userId){
    try{
        const user = await Users.findById(userId,{__v: 0});
        return user;
    } catch(err){
        throw err;
    }
}

async function db_getAllUsersData(){
    try{
        return await Users.find({});
    } catch(err){
        throw err;
    }
}

module.exports = {
    db_addNewUser,
    db_getUserData,
    db_getAllUsersData,
}