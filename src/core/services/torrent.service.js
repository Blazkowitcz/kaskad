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