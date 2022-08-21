const crypto = require('crypto');

function encrypt(plainTextPassword, salt){
    return hash = crypto.pbkdf2Sync(plainTextPassword, salt, 1000000, 64, 'sha512').toString('hex');
}

function generatePassword(plainTextPassword){
    const salt = crypto.randomBytes(32).toString('hex');
    const hashPassword = encrypt(plainTextPassword, salt);
    return{
        hashPassword,
        salt,
    }
}

function verifyPassword(plainTextPassword, salt, hashPassword){
    return hashPassword === encrypt(plainTextPassword, salt);   
}

module.exports = {
    generatePassword,
    verifyPassword,
}

