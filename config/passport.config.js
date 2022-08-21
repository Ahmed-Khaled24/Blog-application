const passport = require('passport');
const localStrategy = require('passport-local');
const {verifyPassword} = require('../util/password.util');
const {
    db_getUserByUsername,
    db_getUserById,
} = require('../models/users/users.model');


async function localVerify(username, password, done){
    try{
        const user = await db_getUserByUsername(username);
        if(!user){
            return done(null, false);
        }
        if(verifyPassword(password, user.salt, user.password)){
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch(err){
        return done(err);
    }
}

passport.use('local', new localStrategy(localVerify));

passport.serializeUser((user, done)=>{
    return done(null, user.id);
});

passport.deserializeUser(async (userId, done)=>{
    const user = await db_getUserById(userId);
    return done(null, user);
});

module.exports = passport
