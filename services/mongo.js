const mongoose = require('mongoose');

mongoose.connection
.once('connected', () => {
    console.log('MongoDB is connected and ready');
})
.on('error', (err) => {
    console.log('MongoDB connection error: ', err);
})

async function connectMongo(){
   await mongoose.connect(process.env.MONGO_URL);
}

module.exports = {
    connectMongo,
}