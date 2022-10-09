const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    password: String,
    imageUrl: {
        type: String,
        default: '/img/default.png'    
    },
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    registerDate: {
        type: Date,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;