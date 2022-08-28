const {db_getUserPosts} = require('../models/users/users.model');
const {db_deletePost} = require('../models/posts/posts.model');

async function renderMyPostsPage(req, res){
    const userPosts = await db_getUserPosts(req.user.id);
    return res.status(200).render('my-posts', {posts: userPosts});
}

async function deleteUserPost(req, res){
    const postId = req.body.postId;
    try {
        await db_deletePost(postId);
        return res.redirect('/my-posts');
    } catch(err){
        return res.status(500).json({
            error: err.message
        })
    }
}


module.exports = {
    renderMyPostsPage, 
    deleteUserPost,
}