const passport = require('passport');
const localStrategy = require('passport-local');
const googleStrategy = require('passport-google-oauth20');
const { verifyPassword } = require('../util/password.util');
const {
    db_getUserByEmail,
    db_getUserById,
    db_addNewUser,
} = require('../models/users/users.model');
const keys = require('../config/keys')


passport.serializeUser((user, done)=>{
    return done(null, user.id);
});

passport.deserializeUser(async (userId, done)=>{
    const user = await db_getUserById(userId);
    return done(null, user);
});

async function localVerify(email, password, done){
    try{
        const user = await db_getUserByEmail(email);
        if(!user){
            return done(null, false);
        }
        if(await verifyPassword(password, user.password)){
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch(err){
        return done(err);
    }
}

passport.use('local', new localStrategy({
    usernameField: 'email',
}, localVerify));


async function googleVerify(accessToken, refreshToken, profile, done) {
    const profileData = profile._json;
    let user = await db_getUserByEmail(profileData.email);
    if(user) {
        return done(null, user)
    }

    user = {    
        firstName: profileData.given_name,
        lastName: profileData.family_name,
        email: profileData.email,
        registerDate: new Date(),
    }
    
    const newUser = await db_addNewUser(user);
    done(null, newUser);
}

passport.use(new googleStrategy({
        clientID: keys.GOOGLE_CLIENT_ID,
        clientSecret: keys.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
    }, googleVerify)
);
