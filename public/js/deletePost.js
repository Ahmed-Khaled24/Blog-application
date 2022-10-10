const deleteButtons = document.getElementsByClassName('delete-btn');
const allPosts = document.querySelector('.all-posts');

for(let btn of deleteButtons) {
    let postId = btn.value;
    btn.addEventListener('click', async () => {
        try {
            let deleteResponse =  await fetch('/posts', {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({postId})
            });
            deleteResponse = await deleteResponse.json();
            if( deleteResponse.status === 'success') {
                window.location.reload();
            } else {
                throw new Error(deleteResponse.message);
            }
        } catch(err) {
            console.log(err.message);
        }     
    });
}

