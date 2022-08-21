const passport = require('passport');
const localStrategy = require('passport-local');
const {db_getUserData} = require('../models/users/users.model');
const {verifyPassword} = require('../util/password.util');

const fieldsNameConfig = {
    usernameField: 'id',
    passport: 'password'
}

async function localVerify(userId, password, done){
    try{
        const user = await db_getUserData(userId);
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

passport.use('local', new localStrategy(fieldsNameConfig, localVerify));

passport.serializeUser((user, done)=>{
    return done(null, user.id);
});

passport.deserializeUser(async (userId, done)=>{
    const user = await db_getUserData(userId);
    return done(null, user);
});

module.exports = passport
