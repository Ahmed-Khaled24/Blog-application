const Posts = require('./posts.mongo');
const {simplifyDate} = require('../../util/posts.util');

async function db_addNewPost(post){
    try {
        await Posts.create(post);
    } catch(err) {
        throw err;
    }
}

async function db_getAllVisiblePosts(){
    try {
        const posts = await Posts
        .find({visible: true}, {__v: 0})
        .populate({path: 'createdBy', select: 'username'})
        .sort({createdAt: 'desc'})
        .lean();   
        posts.forEach((post) => {
           post.createdAt = simplifyDate(post.createdAt);
        });
        return posts;
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