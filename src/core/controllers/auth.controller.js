require('dotenv').config();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../../config.json');
const UserService = require('../services/user.service');

/**
 * Log User
 * @param {Request} req 
 * @param {Response} res 
 */
exports.signin = async (req, res) => {
    const { username, password } = req.body;
    try{
        const user = await UserService.getUserByUsername(username);
        if(!user){
            return res.status(400).json({message: 'Error during login'});
        }
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(400).json({message: 'Error during login'});
        }
        const payload = {
            user: {
                id: user._id,
                username: user.username,
                passkey: user.passkey
            }
        }
        jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 3600}, (err, token) => {
            if(err){
                throw err;
            }else {
                res.status(200).json({token});
            }
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
}

/**
 * Register a new User
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try{
        let user = await UserService.getUserByUsername(username);
        if(user !== null){
            return res.status(401).json({message: 'User already exist'});
        }
        const passkey = crypto.randomBytes(16).toString('hex');
        const salt = await bcrypt.genSalt(10);
        user = await UserService.createUser({username, email, password: await bcrypt.hash(password, salt), passkey});
        return res.status(200).json(user);
    } catch(error){
        console.log(error)
        return res.status(200).json({message: 'An error occured'});
    }
}