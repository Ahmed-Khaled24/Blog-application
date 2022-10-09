const {Router} = require('express');
const {getPutSignedUrl} = require('../controllers/upload.controller');
const uploadRouter = Router();

uploadRouter.get('/upload/requestUploadUrl', getPutSignedUrl);
uploadRouter.get('/upload/requestUpdateUrl', async function getUpdateSignedUrl () {return 0;});

module.exports = uploadRouter;