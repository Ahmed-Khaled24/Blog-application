const {Router} = require('express');
const passport = require('passport');

const googleRouter = Router();

// Start Oauth2 flow to get access token
googleRouter.get('/google', 
    passport.authenticate( 'google', {
        scope: ['profile', 'email']
    })
);

// Use the access token to get the user profile data
googleRouter.get('/google/callback', 
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('/');
    }
);

module.exports = googleRouter;