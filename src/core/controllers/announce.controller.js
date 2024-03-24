const bencode = require('bencode');
const UserService = require('../services/user.service');

/**
 * Announcer
 * @param {Request} req 
 * @param {Response} res
 * @return {Buffer} 
 */
exports.announce = async (req, res) => {
    const info = req.query;
    const passkey = req.params.passkey
    const user = await UserService.getUserByPasskey(passkey);
    if(user !== null){
        // Add peer feature
    }
    const data = {
        interval: 2700,
        min_interval: 1800,
        tracker_id: 'http://127.0.0.1:3000',
        complete: info,
        incomplete: 0,
        peers: []
    }
    res.setHeader('Content-Type', 'text/plain');
    res.end(bencode.encode(data));
}
