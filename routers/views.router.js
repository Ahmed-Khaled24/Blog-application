const {Router} = require('express');
const passport = require('passport');

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
    return res.status(200).render('register');
});


viewsRouter.route('/login')
.get((req, res) => {
    return res.render('login');
})
.post(passport.authenticate('local', {
    successRedirect: '/all-posts',
    failureRedirect: '/login',
}));


viewsRouter.route('/guest')
.get((req, res) => {
    return res.status(200).render('guest');
});


viewsRouter.route('/my-posts')
.get(checkLoggedIn, (req, res) => {
        return res.status(200).render('my-posts');
});


viewsRouter.route('/all-posts')
.get(checkLoggedIn, (req, res) => {
        return res.status(200).render('all-posts');
});

 
viewsRouter.route('/account')
.get(checkLoggedIn, (req, res) => {
        return res.status(200).render('account');
});


viewsRouter.route('/compose')
.get(checkLoggedIn, (req, res) => {
        return res.status(200).render('compose');
});


viewsRouter.route('/logout')
.post(checkLoggedIn, (req, res) => {
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
