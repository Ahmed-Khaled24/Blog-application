const {Router} = require('express');
const {getPutSignedUrl} = require('../controllers/upload.controller');
const uploadRouter = Router();

uploadRouter.get('/requestUploadUrl', getPutSignedUrl);
uploadRouter.get('/requestUpdateUrl', async function getUpdateSignedUrl () {return 0;});

module.exports = uploadRouter;