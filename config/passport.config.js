const passport = require('passport');
const localStrategy = require('passport-local');
const { verifyPassword } = require('../util/password.util');
const {
    db_getUserByEmail,
    db_getUserById,
} = require('../models/users/users.model');


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
        if(verifyPassword(password, user.password)){
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

module.exports = passport
