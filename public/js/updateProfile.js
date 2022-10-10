const photoInput = document.querySelector('input[type="file"]');
const uploadBtn = document.querySelector('#upload-btn');

uploadBtn.addEventListener('click', async () => {
    const photo = photoInput.files[0];

    try{
        // get signed url to upload to aws s3
        let uploadResponse = await fetch('/upload/requestUploadUrl');
        uploadResponse = await uploadResponse.json();

        // update the user photo url
        let update = await fetch('/users', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                update: {
                    imageUrl: uploadResponse.key,
                }
            })
        });

        // upload the photo 
        await fetch(uploadResponse.url, {
            method: 'PUT',
            headers: {
                'Content-Type': photo.type,
            },
            body: photo,
        });

        window.location.reload();
    } catch(err) {
        console.log(err.message);
    }
});

photoInput.addEventListener('change', () => {
    uploadBtn.disabled = false;
})