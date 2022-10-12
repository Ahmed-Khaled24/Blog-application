const s3Client = require('../services/aws-s3');
const {PutObjectCommand} = require('@aws-sdk/client-s3');
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner');
const uuid = require('uuid');


async function getPutSignedUrl(req, res) {
    const key = `${req.user.id}/${uuid.v1()}`; // File name in aws s3 bucket
    const putCommand = new PutObjectCommand({
        Key: key,
        Bucket: process.env.BUCKET_NAME,
    });
    
    try {
        const url = await getSignedUrl(s3Client, putCommand, {expiresIn: 3600});
        return res.status(200).json({
            status: 'success',
            url,
            key,
        });
    } catch(err) {
        return res.status(500).json({
            status: 'fail',
            message: err.stack,
        })
    }
}

module.exports = {
    getPutSignedUrl,
}