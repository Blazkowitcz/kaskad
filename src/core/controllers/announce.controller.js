const bencode = require('bencode');
const UserService = require('../services/user.service');
const PeerService = require('../services/peer.service');
const StringUtils = require('../utils/string.utils');
const config = require('../../../config.json')

/**
 * Announcer
 * @param {Request} req 
 * @param {Response} res
 * @return {Buffer} 
 */
exports.announce = async (req, res) => {
    const info = req.query;
    const passkey = req.params.passkey
    const torrent_hash = StringUtils.decodeHash(info.info_hash)
    const user = await UserService.getUserByPasskey(passkey);
    if(user !== null){
        await PeerService.addPeer({
            user_id: user._id,
            hash: torrent_hash,
            ip: req.headers.host.substring(0, req.headers.host.indexOf(':')),
            port: info.port,
            date: new Date()
        });
    }
    const peers = await PeerService.getPeers(torrent_hash)
    const data = {
        interval: 2700,
        min_interval: 1800,
        tracker_id: `http://${config.address}:3000`,
        complete: info,
        incomplete: 0,
        peers: reformartPeers(peers)
    }
    res.setHeader('Content-Type', 'text/plain');
    res.end(bencode.encode(data));
}

/**
 * Reformat peers array
 * @param {Array} peers 
 * @returns 
 */
function reformartPeers (peers) {
    let results = peers.map((peer) => {
        return {ip: peer.ip, port: peer.port}
    })
    return results;
}
