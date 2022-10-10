function validateUser(user){
    let message;
    if (user.email.trim().length === 0){
        message = 'email field is empty';
    } else if (user.password.trim().length === 0){
        message = 'password field is empty';
    } else if (!checkStrength(user.password)){
        message = 'weak password, your password must be at least 8 characters containing uppercase, lowercase, and digits';    
    } else if (user.firstName.trim().length === 0){
        message = 'first name field is missing';  
    } else if (user.lastName.trim().length === 0){
        message = 'lastName field is missing';     
    } else if (user.password !== user.confirmPassword){
        message = "your password does't match, check it again"
    } else {
        message = 'valid';    
    }
    return message;
}

function checkStrength(password) {
    return /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,50}$/.test(password);
}
