const {Router} = require('express');
const {getPutSignedUrl} = require('../controllers/upload.controller');
const {checkLoggedIn} = require('../util/auth.util')
const uploadRouter = Router();

uploadRouter.get('/requestUploadUrl',checkLoggedIn,  getPutSignedUrl);
uploadRouter.get('/requestUpdateUrl',checkLoggedIn,  async function getUpdateSignedUrl () {return 0;});

module.exports = uploadRouter;