const UserModel = require('../models/user.model');

/**
 * Get User from username
 * @param {String} username 
 * @returns {UserModel}
 */
exports.getUserByUsername = async (username, custom = '') => {
    return await UserModel.findOne({username: username}).select(custom).lean();
}

/**
 * Get User from passkey
 * @param {String} passkey 
 * @returns {UserModel}
 */
exports.getUserByPasskey = async (passkey) => {
    return await UserModel.findOne({passkey: passkey}).select('+passkey').lean();
}

/**
 * Create new User
 * @param {Object} user 
 * @returns {UserModel}
 */
exports.createUser = async (data) => {
    let user = new UserModel({
        username: data.username,
        password: data.password,
        email: data.email,
        passkey: data.passkey
    });
    await user.save();
    return user;
}