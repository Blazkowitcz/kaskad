const jwt = require('jsonwebtoken');
const config = require('../../../config.json');

/**
 * Check token sent by user for authorization
 * @param {Request} req 
 * @param {Result} res 
 * @param {Function} next 
 * @returns 
 */
 exports.checkToken = function (req, res, next) {
    let token = req.header('token');
    if(!token) { return res.status(401).json({message: 'Auth Error'});}
    try{
        let decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded.user;
        next();
    } catch (e) {
        console.log(e)
        res.status(401).send({message: 'Invalid Token'});
    }
}