function validatePost(post){
    if(!post.title){ // there is no title sent from the user
        return {
            isValid : false,
            validationMessage : 'Post title is missing'
        } 
    } else if(!post.body){ // there is no body sent from the user
        return {
            isValid : false,
            validationMessage : 'Post body is missing'
        } 
    } else if(post.title.trim().length === 0){ // the user sent empty title
        return {
            isValid : false,
            validationMessage : 'Post title is empty'
        }
    } else if(post.body.trim().length === 0){ // the use sent empty body
        return {
            isValid : false,
            validationMessage : 'Post body is empty'
        }
    }
    return {
        isValid : true,
        validationMessage : 'Valid post'
    }
}


module.exports = {
    validatePost,
}