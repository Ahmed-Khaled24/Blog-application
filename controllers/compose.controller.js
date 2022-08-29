const {validatePost} = require('../util/posts.util');
const {db_addNewPost} = require('../models/posts/posts.model');


function renderComposePage(req, res){
        return res.status(200).render('compose', {notes: null})
 }

 
async function addNewPost (req, res){
    const post  = req.body;
    const user = req.user;
    const { isValid, validationMessage } = validatePost(post);   
    if(isValid){
        post.createdBy = user.id;
        post.createdAt = Date();
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

module.exports = {
    renderComposePage,
    addNewPost,
};



