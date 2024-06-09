const mongoose = require('mongoose');

const User = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        select: false
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    passkey: {
        type: String,
        required: true,
        select: false
    }
});

module.exports = mongoose.model('user', User);