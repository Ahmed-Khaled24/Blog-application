const crypto = require('crypto');

function hash(plainTextPassword, salt){
    return hash = crypto.pbkdf2Sync(plainTextPassword, salt, 1000000, 64, 'sha512').toString('hex');
}

function generatePassword(plainTextPassword){
    const salt = crypto.randomBytes(32).toString('hex');
    const hashPassword = hash(plainTextPassword, salt);
    return{
        hashPassword,
        salt,
    }
}

function verifyPassword(plainTextPassword, salt, hashPassword){
    return hashPassword === hash(plainTextPassword, salt);   
}

module.exports = {
    generatePassword,
    verifyPassword,
}

