const {Router} = require('express');
const passport = require('passport');
const request = require('axios');
const {
    db_addNewPost,
    db_getAllVisiblePosts,
    db_getPost,
} = require('../models/posts/posts.model');
const {
    db_addNewUser,
    db_getUserById,
    db_getAllUsersData,
    db_getUserByUsername,
    db_getUserPosts,
} = require('../models/users/users.model');


const viewsRouter = Router();


function checkLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        next();
    } else {
        return res.status(302).redirect('/login');
    }
}


viewsRouter.route('/')
.get((req, res) => {
    return res.status(200).render('home')
});


viewsRouter.route('/register')
.get((req, res) => {
    return res.status(200).render('register', {notes: null});
})
.post( async (req, res)=>{
    try{
    const response = await request({
        method: 'post',
        url: 'http://localhost:3000/users',
        data: req.body,
    });
    console.log(response.data);
    return res.render('login', {notes: `${response.data.success} login to continue`});
    } catch(err){   
        return res.render('register', {notes: err.response.data.error}); 
    }
})


viewsRouter.route('/login')
.get((req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/all-posts');
    } else{
        return res.render('login', {notes: null});
    }
})
.post(passport.authenticate('local', {
    successRedirect: '/all-posts',
    failureRedirect: '/login',
}));


viewsRouter.route('/guest')
.get( async (req, res) => {
    const posts = await db_getAllVisiblePosts();
    return res.status(200).render('guest', {posts: posts});
});


viewsRouter.route('/all-posts')
.get(checkLoggedIn, async (req, res) => {
    const posts = await db_getAllVisiblePosts();
    return res.status(200).render('all-posts', {posts: posts});
});


viewsRouter.route('/my-posts')
.get(checkLoggedIn, async (req, res) => {
    const userPosts = await db_getUserPosts(req.user.id);
    return res.status(200).render('my-posts', {posts: userPosts});
});

 
viewsRouter.route('/account')
.get(checkLoggedIn, (req, res) => {
        return res.status(200).render('account',{
            username: req.user.username,
             email: req.user.email,
        });
});


viewsRouter.route('/compose')
.get(checkLoggedIn, (req, res) => {
        return res.status(200).render('compose');
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
