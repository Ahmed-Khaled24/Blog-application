const {
    db_addNewPost,
    db_getAllVisiblePosts,
    db_getUserPosts,
} = require('../models/posts/posts.model');

 const {
    validatePost,
 } = require('../util/posts.util');

async function addNewPost(req, res){
    const post  = req.body;
    const user = req.user;
    const { postIsValid, validationMessage } = validatePost(post);   
    if(postIsValid){
        post.createdBy = user.id;
        post.createdAt = Date();
        try {
            await db_addNewPost(post);
            return res.status(201).json({
                status: 'post created successfully',
            });
        } catch(err){
            return res.status(500).json({
                error: err.message,
            });
        }
    } else {
        return res.status(400).json({
            error: validationMessage,
        });
    }
}

async function getAllVisiblePosts(rea, res){
    try{
        const posts = await db_getAllVisiblePosts();
        return res.status(200).json(posts);
    } catch(err){
        return res.status(500).json({
            error: err.message,
        });
    }
}

async function getUserPosts(req, res){
    const userId = req.params.userId;
    try{
        const posts = await db_getUserPosts(userId);
        return res.status(200).json(posts);
    } catch(err){
        return res.status(500).json({
            error: err.message,
        })
    }
}

module.exports = {
    addNewPost, 
    getAllVisiblePosts,
    getUserPosts,
}