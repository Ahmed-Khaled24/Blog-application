module.exports = {
    PORT: 3000,
    SESSION_SECRET: process.env.SESSION_SECRET,
    MONGO_URL: process.env.MONGO_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID_PROD,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET_PROD,
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    BUCKET_NAME: 'blogs-website-bucket',
    GOOGLE_CALLBACK: 'https://kh-blog-website.herokuapp.com/auth/google/callback',
}