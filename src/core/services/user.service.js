const UserModel = require('../models/user.model');

/**
 * Get User from username
 * @param {String} username 
 * @returns {UserModel}
 */
exports.getUserByUsername = async (username) => {
    return await UserModel.findOne({username: username}).lean();
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