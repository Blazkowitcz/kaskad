const mongoose = require('mongoose');
const UserModel = require('./user.model')

const Peer = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
        autopopulate: { select: '-__v' },
        required: true,
    },
    hash: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    port: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('peer', Peer);