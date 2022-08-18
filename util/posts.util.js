function validatePost(post){
    if(!post.title){ // there is no title sent from the user
        return {
            valid : false,
            message : 'Post title is missing'
        } 
    } else if(!post.body){ // there is no body sent from the user
        return {
            valid : false,
            message : 'Post body is missing'
        } 
    } else if(post.title.trim().length === 0){ // the user sent empty title
        return {
            valid : false,
            message : 'Post title is empty'
        }
    } else if(post.body.trim().length === 0){ // the use sent empty body
        return {
            valid : false,
            message : 'Post body is empty'
        }
    }

    return {
        valid : true,
        message : 'Valid post'
    }
}


module.exports = {
    validatePost,
}