const {Router} = require('express');
const passport = require('passport');
const {
    renderRegisterPage,
    registerNewUser,
} = require('../controllers/register.controller');

const registerRouter = Router(); 

registerRouter.route('/')
.get(renderRegisterPage)
.post(registerNewUser , passport.authenticate('local', 
    { successRedirect: '/all-posts',
      failureRedirect: '/login'
}));

module.exports = registerRouter;