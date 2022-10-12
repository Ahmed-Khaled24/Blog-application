const singUp_btn = document.getElementById('signup-btn');
const singUp_form = document.querySelector('form');

singUp_form.addEventListener('submit', async (event) => {
    event.preventDefault();
    startLoader();
    const firstName = document.querySelector('input[name="firstName"]').value.trim();
    const lastName = document.querySelector('input[name="lastName"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.toLowerCase().trim();
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector('input[name="confirmPassword"]').value;

    const user = {
        firstName, lastName, email, password
    }

    const validationMessage= validateUser({...user, confirmPassword});
    if(validationMessage !== 'valid'){
        stopLoader();
        return addErrorElement(validationMessage);
    }

    try {
        // send sing up request
        let signUp_response = await fetch('/users', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        signUp_response = await signUp_response.json();

        if (signUp_response.status === 'success'){
            // send sing in request
            let login_response = await fetch('/auth/local', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({ email, password }),
            })
            
            login_response = await login_response.text();
            if(login_response === 'Authorized') {
                window.location.href = '/all-posts'
            } else {
                throw new Error(login_response.message)
            }         
        } else {
            throw new Error(signUp_response.message)
        }

    } catch(err) {
        stopLoader();
        addErrorElement(err.message);
    }
})

function startLoader(){
    singUp_btn.disabled = true;
    singUp_btn.innerHTML = '<div class="loader"> </div>';
}

function stopLoader(){
    singUp_btn.disabled = false;
    singUp_btn.innerHTML = 'Sign up';
}