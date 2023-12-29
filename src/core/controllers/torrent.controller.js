const TorrentService = require('../services/torrent.service');

/**
 * Get last Torrents
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getLastTorrents = async (req, res) => {
    const results = await TorrentService.getLastTorrents();
    res.status(200).json(results);
}

/**
 * Get best Torrents
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getBestTorrents = async (req, res) => {
    const results = await TorrentService.getBestTorrents();
    res.status(200).json(results);
}