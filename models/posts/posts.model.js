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
        return Posts
        .find({visible: true}, {__v: 0})
        .populate({path: 'createdBy', select: 'username'})
        .sort({createdAt: 'desc'});   
    } catch(err) {
        throw(err);
    }
}

async function db_getPost(postId){
    try{
        return Posts.findById(postId, {__v: 0});
    } catch (err) {
        throw(err);
    }
}

async function db_deletePost(postId){
    try{
        return await Posts.updateOne({_id: postId}, {visible: false});
    } catch(err){
        throw err;
    }  
}

module.exports = {
    db_addNewPost,
    db_getAllVisiblePosts,
    db_getPost,
    db_deletePost,
}