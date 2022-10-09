document.getElementById('submit-btn').addEventListener('click', 
async () => {
    const photo = document.getElementById('image').files[0];
    let uploadRequest = null;
    if (photo) { // If there is a photo in the post
        uploadRequest = await fetch('/upload/requestUploadUrl');
        uploadRequest = await uploadRequest.json();
        const uploadUrl = uploadRequest.url;
        try {
            await fetch(uploadUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': photo.type
                },
                body: photo,
            })
        } catch(err) {
            console.log(err.message);
            return;
        }
    }
    
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const imageUrl = (uploadRequest ? uploadRequest.key : null);

    const post = {
        title, body, imageUrl
    }
    
    try { 
        await fetch('/compose', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        });
        window.location.href = '/all-posts';
    } catch(err) {
        console.log(err.message);
    }
})