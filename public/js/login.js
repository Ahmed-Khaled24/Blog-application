const login_btn = document.querySelector('#login-btn');
const login_form = document.querySelector('form');


login_form.addEventListener('submit', async (event) => {
    event.preventDefault();
    login_btn.disable = 'true';
    const email = document.querySelector('input[name=email]').value;
    const password = document.querySelector('input[name=password]').value;
    
    try {
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
            login_btn.disable = 'false';
            throw new Error('Invalid Email or Password');
        }
    } catch(err) {
        console.log(err.message);
    }
})



