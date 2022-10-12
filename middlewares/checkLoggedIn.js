function checkLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        next();
    } else {
        return res.status(302).redirect('/login');
    }
}

module.exports = checkLoggedIn;
