const {S3Client} = require('@aws-sdk/client-s3');
const keys = require('../config/keys');

 const params = {
    credentials: {
        accessKeyId: keys.S3_ACCESS_KEY_ID,
        secretAccessKey: keys.S3_SECRET_ACCESS_KEY,
    },
    region: 'eu-west-3'
 }
 const s3Client = new S3Client(params);

 module.exports = s3Client;