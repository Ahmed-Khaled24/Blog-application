const {Router} = require('express');
const {checkLoggedIn} = require('../util/auth.util');
const {db_getAllVisiblePosts,} = require('../models/posts/posts.model');

const viewsRouter = Router();


viewsRouter.route('/')
.get((req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('all-posts');
    } else {
        return res.render('home');
    }
});


viewsRouter.route('/all-posts')
.get(checkLoggedIn, async (req, res) => {
    const posts = await db_getAllVisiblePosts();
    return res.status(200).render('all-posts', {posts: posts});
});


viewsRouter.route('/account')
.get(checkLoggedIn, (req, res) => {
        return res.status(200).render('account',{user: req.user });
});

viewsRouter.route('/logout')
.get(checkLoggedIn, (req, res) => {
    req.logout((err) => {
        if(err)
            return res.status(500).json({error: err.message})   
    });
    return res.status(302).redirect('/');
})


viewsRouter.route('/*')
.get((req, res) => {
    return res.status(404).send('ERROR 404 PAGE NOT FOUND');
});


module.exports = viewsRouter;
