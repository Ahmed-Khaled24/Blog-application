const {Router} = require('express');
const passport = require('passport');

const authRouter = Router();

// Start Oauth2 flow to get access token
authRouter.get('/google', 
    passport.authenticate( 'google', {
        scope: ['profile', 'email']
    })
);

// Use the access token to get the user profile data
authRouter.get('/google/callback', 
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('/');
    }
);

// Local authorization
authRouter.post('/local', 
    passport.authenticate('local'),
    (req, res) => {
        res.status(200).send('Authorized')
    }
)


module.exports = authRouter;