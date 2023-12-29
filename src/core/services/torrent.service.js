const TorrentModel = require('../models/torrent.model');

/**
 * Get last Torrents
 * @returns {TorrentModel[]}
 */
exports.getLastTorrents = async () => {
    return await TorrentModel.find().sort({'created_at': -1}).select('-__v').limit(20);
}

/**
 * Get best Torrents
 * @returns {TorrentModel[]}
 */
exports.getBestTorrents = async () => {
    return await TorrentModel.find().sort({'completed': +1}).select('-__v').limit(20);
}

/**
 * Get Torrent by its id
 * @param {String} id
 * @returns {TorrentModel}
 */
exports.getTorrent = async (id) => {
    return await TorrentModel.findOne({_id: id}).lean();
}

/**
 * Get Torrent by its hash
 * @param {String} hash 
 * @returns {TorrentModel}
 */
exports.getTorrentByHash = async (hash) => {
    return await TorrentModel.findOne({hash: hash}).lean();
}

exports.createTorrent = async (data) => {
    const torrent = new TorrentModel(data);
    return await torrent.save();
}