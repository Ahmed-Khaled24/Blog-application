const app = document.querySelector('.app');

function addErrorElement(errorMessage){
    clearErrors();
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error-container');
    errorDiv.innerHTML = `<p class="error-paragraph"> ${simplifyError(errorMessage)} </p>`;
    app.appendChild(errorDiv);
    window.scrollTo(0, document.body.scrollHeight);
}

function simplifyError(errorMessage){
    const msg = errorMessage.toLowerCase();
    console.log(msg);
    if(msg.includes('duplicate') && msg.includes('email')){
        return 'The email you entered is already registered, use another one or use it to Login';
    }
    return errorMessage;
}

function clearErrors(){
    const allErrors = document.querySelectorAll('.error-container');
    for(let error of allErrors){
        error.remove();
    }
}