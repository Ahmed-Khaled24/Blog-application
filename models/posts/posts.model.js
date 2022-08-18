const Posts = require('./posts.mongo');

async function db_addNewPost(post){
    try {
        await Posts.create(post);
    } catch(err) {
        throw err;
    }
}

async function db_getAllVisiblePosts(){
    try {
        return Posts.find({visible: true}, {__v: 0});   
    } catch(err) {
        throw(err);
    }
}

async function db_getUserPosts(userId){
    try{
        return Posts.find({createdBy: userId}, {__v: 0});
    } catch (err) {
        throw(err);
    }
}

module.exports = {
    db_addNewPost,
    db_getAllVisiblePosts,
    db_getUserPosts,
}