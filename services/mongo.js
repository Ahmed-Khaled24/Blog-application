const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.connection
.once('connected', () => {
    console.log('MongoDB is connected and ready');
})
.on('error', (err) => {
    console.log('MongoDB connection error: ', err);
})
.on('disconnected', () => {
    console.log('MongoDB disconnected successfully')
})

async function connectMongo(){
    await mongoose.connect(keys.MONGO_URL);
}

async function disconnectMongo(){
    await mongoose.disconnect();
}

module.exports = {
    connectMongo,
    disconnectMongo,
}