const photoInput = document.querySelector('input[type="file"]');
const uploadBtn = document.querySelector('#upload-btn');


uploadBtn.addEventListener('click', async () => {
    const photo = photoInput.files[0];

    // compress the photo for upload
    const compressOptions = {
        maxSizeMB: 0.5,
        userWebWorker: true,
    }
    const compressedPhoto = await imageCompression(photo, compressOptions)

    startLoader();
    try{
        // get signed url to upload to aws s3
        let uploadResponse = await fetch('/upload/requestUploadUrl');
        uploadResponse = await uploadResponse.json();

        // upload the photo 
        await fetch(uploadResponse.url, {
            method: 'PUT',
            headers: {
                'Content-Type': compressedPhoto.type,
            },
            body: compressedPhoto,
        });

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

        window.location.reload();
    } catch(err) {
        stopLoader();
        addErrorElement(err.message);
    }
});

photoInput.addEventListener('change', () => {
    uploadBtn.disabled = false;
})

function startLoader(){
    uploadBtn.disabled = true;
    uploadBtn.innerHTML = '<div class="loader"> </div>';
}

function stopLoader(){
    uploadBtn.innerHTML = 'Update photo';
}

function cropImage(htmlImageElement){
    
}