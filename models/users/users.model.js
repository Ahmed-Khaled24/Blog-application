const Users = require('./users.mongo');
const Posts = require('../posts/posts.mongo');

async function db_addNewUser(user){
    try{
        return await Users.create(user);
    } catch(err){
        throw err;
    }
}

async function db_getUserData(userId){
    try{
        return await Users.findById(userId,{__v: 0, password: 0});
    } catch(err){
        throw err;
    }
}

async function db_getAllUsersData(){
    try{
        return await Users.find({}, {__v: 0, password: 0});
    } catch(err){
        throw err;
    }
}

async function db_getUserPosts(userId){
    try{
        return await Posts.find({createdBy: userId}, {__v: 0});
    } catch(err){
        throw(err);
    }
}
module.exports = {
    db_addNewUser,
    db_getUserData,
    db_getAllUsersData,
    db_getUserPosts,
}