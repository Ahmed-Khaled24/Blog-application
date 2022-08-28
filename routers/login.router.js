const {Router} = require('express');
const passport = require('passport')
const {renderLoginPage} = require('../controllers/login.controller');

const loginRouter = Router();

loginRouter.route('/')
.get(renderLoginPage)
.post(passport.authenticate('local', {
    successRedirect: '/all-posts',
    failureRedirect: '/login',
}));

module.exports = loginRouter;