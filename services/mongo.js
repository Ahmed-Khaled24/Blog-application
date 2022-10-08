const mongoose = require('mongoose');

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
    await mongoose.connect(process.env.MONGO_URL);
}

async function disconnectMongo(){
    await mongoose.disconnect();
}

module.exports = {
    connectMongo,
    disconnectMongo,
}