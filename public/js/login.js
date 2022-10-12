const login_btn = document.querySelector('#login-btn');
const login_form = document.querySelector('form');


login_form.addEventListener('submit', async (event) => {
    event.preventDefault();
    startLoader();
    const email = document.querySelector('input[name=email]').value.toLowerCase().trim();
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
            throw new Error('invalid email or password');
        }
    } catch(err) {
        stopLoader();
        addErrorElement(err.message);
    }
})


function startLoader(){
    login_btn.disabled = true;
    login_btn.innerHTML = '<div class="loader"> </div>';
}

function stopLoader(){
    login_btn.disabled = false;
    login_btn.innerHTML = 'Login';
}


