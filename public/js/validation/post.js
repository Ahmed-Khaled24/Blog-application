function validatePost(post){
    let message;
    if (post.title.trim().length === 0) {
        message = 'post title is empty'
    } else if (post.body.trim().length === 0) {
         message = 'post body is empty'       
    } else {
        message = 'valid'
    }
    return message;
}
