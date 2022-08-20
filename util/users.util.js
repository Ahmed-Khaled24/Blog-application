function validateUserInitialData(user){
    if(!user.username){ 
        return {
            isValid: false,
            validationMessage: 'username field is missing'
        }
    } else if(!user.email){
        return {
            isValid: false,
            validationMessage: 'email field is missing'
        }
    } else if(!user.password){
        return {
            isValid: false,
            validationMessage: 'password field is missing'
        }
    } else if(user.username.trim().length === 0){
        return {
            isValid: false,
            validationMessage: 'username filed is empty'
        }
    } else if(user.email.trim().length === 0){
        return {
            isValid: false,
            validationMessage: 'email field is missing'
        }
    } else if(user.password.trim().length === 0){
        return {
            isValid: false,
            validationMessage: 'password field is empty'
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