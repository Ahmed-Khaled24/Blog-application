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
    return res.status(200).send('HOME PAGE')
});


viewsRouter.route('/register')
.get((req, res) => {
    return res.status(200).send('REGISTER PAGE');
});


viewsRouter.route('/login')
.get((req, res) => {
    return res.send('LOGIN PAGE');
})
.post(passport.authenticate('local', {
    successRedirect: '/all-posts',
    failureRedirect: '/login',
}));


viewsRouter.route('/guest')
.get((req, res) => {
    return res.status(200).send('GUEST PAGE');
});


viewsRouter.route('/my-posts')
.get(checkLoggedIn, (req, res) => {
        return res.status(200).send('MY POSTS PAGE');
});


viewsRouter.route('/all-posts')
.get(checkLoggedIn, (req, res) => {
        return res.status(200).send('ALL POSTS PAGE');
});

 
viewsRouter.route('/account')
.get(checkLoggedIn, (req, res) => {
        return res.status(200).send('ACCOUNT PAGE');
});


viewsRouter.route('/compose')
.get(checkLoggedIn, (req, res) => {
        return res.status(200).send('COMPOSE PAGE');
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
