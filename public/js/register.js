const singUp_btn = document.getElementById('signup-btn');
const singUp_form = document.querySelector('form');

singUp_form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const firstName = document.querySelector('input[name="firstName"]').value;
    const lastName = document.querySelector('input[name="lastName"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector('input[name="confirmPassword"]').value;

    const user = {
        firstName, lastName, email, password
    }

    const validationMessage= validateUser({...user, confirmPassword});
    if(validationMessage !== 'valid'){
        addErrorElement(validationMessage);
        return;
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
        addErrorElement(err.message);
    }
})