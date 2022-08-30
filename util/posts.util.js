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


function simplifyDate(postDate) {
	const monthsName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const createdAt = postDate.valueOf();
	const renderAt = Date.now();

	const minutes = Math.floor((renderAt - createdAt) / (1000 * 60));
	if (minutes < 1) {
		return 'Now';
	}
	else if (minutes == 1) {
		return `${minutes} minute ago`;
	}

	const hours = Math.floor(minutes / 60);
	if (hours < 1) {
		return `${minutes} minutes ago`;
	}
	else if (hours == 1) {
		return `${hours} hour ago`;
	}
	else if (hours > 1 && hours < 24) {
		return `${hours} hours ago`;
	}

	const days = Math.floor(hours / 24);
	if (days == 1) {
		return `${days} day ago`;
	}
	else if (days < 30) {
		return `${days} days ago`;
	}

	const months = Math.floor(days / 30);
	if (months == 1) {
		return `${months} month ago`
	}
	else if (months < 12) {
		return `${months} months ago`
	}

	return `${monthsName[postDate.getMonth()]}, ${postDate.getFullYear()}`
}

module.exports = {
    validatePost,
    simplifyDate,
}