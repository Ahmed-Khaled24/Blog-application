const Users = require('./users.mongo');
const Posts = require('../posts/posts.mongo');
const {simplifyDate} = require('../../util/posts.util');

async function db_addNewUser(user){
    try{
        return await Users.create(user);
    } catch(err){
        throw err;
    }
}

async function db_getUserById(userId){
    try{
        return await Users.findById(userId);
    } catch(err){
        throw err;
    }
}

async function db_getUserByEmail(email){
    try{
        return await Users.findOne({email: email});
    } catch(err) {
        throw(err)
    }
}

async function db_getAllUsersData(){
    try{
        return await Users.find({});
    } catch(err){
        throw err;
    }
}

async function db_getUserPosts(userId){
    try{
        const posts = await Posts
            .find({createdBy: userId, visible: true}, {__v: 0})
            .populate({path: 'createdBy', select: 'username'})
            .sort({createdAt: 'desc'})
            .lean();
        posts.forEach((post)=>{
            post.createdAt = simplifyDate(post.createdAt);
        });
        return posts;
    } catch(err){
        throw(err);
    }
}
module.exports = {
    db_addNewUser,
    db_getUserById,
    db_getAllUsersData,
    db_getUserByEmail,
    db_getUserPosts,
}