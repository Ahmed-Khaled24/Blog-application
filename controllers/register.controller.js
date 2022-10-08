const {encryptPassword} = require('../util/password.util');
const {db_addNewUser} = require('../models/users/users.model');
const {validateUserInitialData} = require('../util/users.util');

function renderRegisterPage (req, res) {
    return res.status(200).render('register', {notes: null});
}

async function registerNewUser (req, res, next) {
    
    const{ isValid, validationMessage } = validateUserInitialData(req.body);
    if(!isValid){
        return res.status(400).json({
            error: validationMessage,
        })
    }

    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: await encryptPassword(req.body.password),
        registerDate: Date(),
    }
    try{
        await db_addNewUser(user);
        return next();
    } catch(err){
        return res.render('register', {notes: err.message});
    }
}


module.exports = {
    renderRegisterPage,
    registerNewUser,
};