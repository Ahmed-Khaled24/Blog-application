const {Router} = require('express');
const passport = require('passport');

const viewsRouter = Router();

viewsRouter.route('/')
.get((req, res) => {
    res.status(200).send('HOME PAGE')
});


viewsRouter.route('/register')
.get((req, res) => {
    res.status(200).send('REGISTER PAGE');
});


viewsRouter.route('/login')
.get((req, res) => {
    res.send('LOGIN PAGE');
})
.post(passport.authenticate('local', 
    {
        failureRedirect: '/login',
        successRedirect: '/all-posts'
    }
));


viewsRouter.route('/guest')
.get((req, res) => {
    res.status(200).send('GUEST PAGE');
});


viewsRouter.route('/my-posts')
.get(passport.authenticate('local', {failureRedirect: '/login'}),
    (req, res) => {
        res.status(200).send('MY POSTS PAGE');
});


viewsRouter.route('/all-posts')
.get(passport.authenticate('local', {failureRedirect: '/login'}),
    (req, res)=>{
        res.status(200).send('ALL POSTS PAGE');
});

 
viewsRouter.route('/account')
.get(passport.authenticate('local', {failureRedirect: '/login'}),
    (req, res)=>{
        res.status(200).send('ACCOUNT PAGE');
});


viewsRouter.route('/compose')
.get(passport.authenticate('local', {failureRedirect: '/login'}),
    (req, res)=>{
        res.status(200).send('COMPOSE PAGE');
});

viewsRouter.route('/*')
.get((req, res) => {
    res.status(404).send('ERROR 404 PAGE NOT FOUND');
})


module.exports = viewsRouter;
