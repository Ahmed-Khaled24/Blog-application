const {
    db_getAllVisiblePosts,
    db_getPost,
    db_deletePost,
} = require('../models/posts/posts.model');

 const { validatePost } = require('../util/posts.util');

 async function addNewPost (req, res){
    const post  = req.body;
    const user = req.user;
    const { isValid, validationMessage } = validatePost(post);   
    if(isValid){
        post.createdBy = user.id;
        post.createdAt = new Date();
        try {
            await db_addNewPost(post);
            return res.status(201).redirect('/all-posts');
        } catch(err){
            return res.status(500).render('compose')
        }
    } else {
        return res.status(400).render('compose', {notes: validationMessage});
    }
}

async function getAllVisiblePosts(req, res){
    try{
        const posts = await db_getAllVisiblePosts();
        return res.status(200).json(posts);
    } catch(err){
        return res.status(500).json({
            error: err.message,
        });
    }
}

async function getPost(req, res){
    const userId = req.params.postId;
    try{
        const post = await db_getPost(postId);
        return res.status(200).json(post);
    } catch(err){
        return res.status(500).json({
            error: err.message,
        })
    }
}

async function deletePost(req, res){
    const postId = req.body.postId;
    try {
        await db_deletePost(postId);
        return res.status(200).json({
            status: 'post deleted successfully'
        }) 
    } catch(err){
        return res.status(500).json({
            error: err.message
        })
    }
}

module.exports = {
    addNewPost,
    getAllVisiblePosts,
    getPost,
    deletePost,
}