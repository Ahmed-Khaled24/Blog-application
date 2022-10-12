const form = document.querySelector('form');
const submitBtn = document.querySelector('#submit-btn');

form.addEventListener('submit', 
    async (event) => {
        event.preventDefault();
        startLoader();
        const photo = document.getElementById('image').files[0];
        let uploadRequest = null;
        if (photo) { // If there is a photo in the post
            const compressOptions = {
                maxSizeMB: 2,
                userWebWorker: true,
            }
            const compressedPhoto = await imageCompression(photo, compressOptions);

            uploadRequest = await fetch('/upload/requestUploadUrl');
            uploadRequest = await uploadRequest.json();
            const uploadUrl = uploadRequest.url;
            try {
                await fetch(uploadUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': compressedPhoto.type
                    },
                    body: compressedPhoto,
                })
            } catch(err) {   
                stopLoader();
                addErrorElement(err.message);
                return;
            }
        }
        
        const title = document.getElementById('title').value;
        const body = document.getElementById('body').value;
        const imageUrl = (uploadRequest ? uploadRequest.key : null);

        const post = {
            title, 
            body, 
            imageUrl
        }
        
        const validationMessage = validatePost(post);
        if(validationMessage !== 'valid'){
            stopLoader();
            return addErrorElement(validationMessage);
        }

        try { 
            let response = await fetch('/posts', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            });
            response = await response.json();

            if(response.status === 'success'){
                window.location.href = '/all-posts';
            } else { 
                throw new Error(response.message);
            }

        } catch(err) {
            stopLoader();
            addErrorElement(err.message);
        }
})

function startLoader(){
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="loader"> </div>';
}

function stopLoader(){
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Add';
}