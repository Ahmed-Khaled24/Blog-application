const {Router} = require('express');
const  checkLoggedIn  = require('../middlewares/checkLoggedIn');
const {db_getAllVisiblePosts} = require('../models/posts/posts.model');
const {db_getUserPosts} = require('../models/users/users.model');


const viewsRouter = Router();


viewsRouter.get('/', 
    (req, res) => {
        if(req.isAuthenticated()){
            return res.redirect('all-posts');
        } else {
            return res.render('home');
        }
    }
);


viewsRouter.get('/my-posts', checkLoggedIn, 
    async (req, res) => {
        const posts = await db_getUserPosts(req.user.id);
        res.render('my-posts', {posts: posts});
    }
);


viewsRouter.get('/login', 
    (req, res) => {
        res.render('login');
    }    
);


viewsRouter.get('/register',
    (req, res) => {
        res.render('register')
    }
);


viewsRouter.get('/compose', checkLoggedIn, 
    (req, res) => {
        res.render('compose');
    }
);


viewsRouter.get('/all-posts', checkLoggedIn, 
    async (req, res) => {
        const posts = await db_getAllVisiblePosts();
        return res.render('all-posts', {posts: posts});
    }
);


viewsRouter.get('/account', checkLoggedIn, 
    (req, res) => {
        return res.render('account',{
            user: req.user 
        });
    }
);


viewsRouter.get('/logout', checkLoggedIn, 
    (req, res) => {
        req.logout( (err) => {
            if(err)
                return res.status(500).json({
                    status: 'fail',
                    message: err.message,
                })   
        });
        return res.status(302).redirect('/');
    }
);


viewsRouter.get('/*',
    (req, res) => {
        return res.status(404).send('ERROR 404 PAGE NOT FOUND');
    }
);


module.exports = viewsRouter;
