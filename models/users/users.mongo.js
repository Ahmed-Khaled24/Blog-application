const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt:{
        type: String,
        required: true,
    },
    userSource: {
        type: String,
        required: true,
    },
    registerDate: {
        type: Date,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    }
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;