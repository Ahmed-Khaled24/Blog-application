const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    registerDate: {
        type: Date,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    }
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;