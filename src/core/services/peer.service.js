const { hash } = require('crypto');
const PeerModel = require('../models/peer.model');

/**
 * Get all peers from a torrent hash
 * @param {String} hash 
 * @returns 
 */
exports.getPeers = async (hash) => {
    return await PeerModel.find({hash: hash});
}

/**
 * Get peers number from a torrent hash
 * @param {String} hash 
 * @returns 
 */
exports.getPeersNumber = async (hash) => {
    return await PeerModel.countDocuments({hash: hash});
}

/**
 * Add new peer
 * @param {Object} data 
 */
exports.addPeer = async (data) => {
    let peer = await PeerModel.findOne({hash: data.hash, user_id: data.user_id});
    if(peer === null){
        peer = new PeerModel(data);
        await peer.save();
    }
    return peer;
}