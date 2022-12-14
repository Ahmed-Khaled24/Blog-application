const { checkStrength } = require("./password.util")

function validateUserInitialData(user){
    if(!user.email){
        return {
            isValid: false,
            validationMessage: 'email field is missing'
        }
    } else if(!user.password){
        return {
            isValid: false,
            validationMessage: 'password field is missing'
        }
    } else if(user.email.trim().length === 0){
        return {
            isValid: false,
            validationMessage: 'email field is empty'
        }
    } else if(user.password.trim().length === 0){
        return {
            isValid: false,
            validationMessage: 'password field is empty'
        }
    } else if (!checkStrength(user.password)){
        return {
            isValid: false,
            validationMessage: 'weak password, your password must be at least 8 characters containing uppercase, lowercase, and digits'
        }
    } else if(user.firstName.trim().length === 0){
        return {
            isValid: false,
            validationMessage: 'first name field is empty'
        }
    } else if(user.lastName.trim().length === 0){
        return {
            isValid: false,
            validationMessage: 'last name field is empty'
        }
    } else if(!user.firstName){
        return {
            isValid: false,
            validationMessage: 'first name field is missing'
        }
    } else if(!user.lastName){
        return {
            isValid: false,
            validationMessage: 'last name field is missing'
        }
    } else {
        return {
            isValid: true,
            validationMessage: 'valid data'
        }
    }
}

module.exports = {
    validateUserInitialData,
}