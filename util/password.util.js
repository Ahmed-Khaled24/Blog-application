const bcrypt = require('bcrypt');

async function encryptPassword(plainTextPassword) {
    const encryptedPassword = await bcrypt.hash(plainTextPassword, 12);
    return encryptedPassword;
}

async function verifyPassword(plainTextPassword, encryptedPassword){
    const isValid = await bcrypt.compare(plainTextPassword, encryptedPassword);
    return isValid;
}

function checkStrength(password) {
    /*
        check that user password consists of at least one uppercase, one lowercase, and one digit 
        8 characters length minimum  
    */
    return /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,50}$/.test(password);
}

module.exports = {
    encryptPassword, 
    verifyPassword,
    checkStrength,
}

