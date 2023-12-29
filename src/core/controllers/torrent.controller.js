const parse_torrent = require('parse-torrent');
const crypto = require("crypto");
const slug = require('slug');
const fs = require('fs');
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

/**
 * Upload a new Torrent
 * @param {Request} req 
 * @param {Response} res 
 */
exports.upload = async (req, res) => {
    const body = req.body;
    const data = parse_torrent(req.files.torrent.data);
    let torrent = await TorrentService.getTorrentByHash(data.infoHash);
    if (torrent === null){
        const file = req.files.torrent;
        const filename = `${crypto.randomBytes(16).toString('hex')}.torrent`;
        torrent = await TorrentService.createTorrent({
            name: data.name,
            slug: slug(data.name),
            description: body.description,
            filename: filename,
            hash: data.infoHash
        });
        file.mv(`./public/torrents/${filename}`);
    }
    res.status(200).json({});
}

/**
 * Download a Torrent
 * @param {Request} req 
 * @param {Response} res 
 */
exports.download = async (req, res) => {
    const torrent = await TorrentService.getTorrent(req.params.id);
    if(torrent === null){
        return res.status(422).json({});
    }
    const data = parse_torrent(fs.readFileSync(`./public/torrents/${torrent.filename}`));
    
}