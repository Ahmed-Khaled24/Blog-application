
function renderLoginPage (req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/all-posts');
    } else{
        return res.render('login', {notes: null});
    }
}

module.exports = {
    renderLoginPage,
}