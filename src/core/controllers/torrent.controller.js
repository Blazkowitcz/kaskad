var parseTorrent = require('parse-torrent')
const crypto = require("crypto");
const stringUtils = require('../utils/string.utils');
const torrentUtils = require('../utils/torrent.utils');
const fs = require('fs');
const TorrentService = require('../services/torrent.service');
const { Readable } = require("stream");

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
    const data = parseTorrent(req.files.torrent.data);
    let torrent = await TorrentService.getTorrentByHash(data.infoHash);
    if (torrent === null){
        const file = req.files.torrent;
        const filename = `${crypto.randomBytes(16).toString('hex')}.torrent`;
        torrent = await TorrentService.createTorrent({
            name: data.name,
            slug: stringUtils.slug(data.name),
            description: body.description,
            filename: filename,
            hash: data.infoHash,
            subcategory: body.subcategory,
            size: data.length,
            user: body.user
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
    const data = parseTorrent(fs.readFileSync(`./public/torrents/${torrent.filename}`));
    data.createdBy = 'kaskad';
    data.announce[0] = 'http://127.0.0.1:3000/announce/' + req.user.passkey;
    const newTorrent = parseTorrent.toTorrentFile(data);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    res.set({
        'Content-Disposition': `attachment; filename="${torrentUtils.formatName(data.name + '.torrent')}"`,
        'Content-Type': 'text/plain'
    });
    let stream = Readable.from(newTorrent);
    stream.pipe(res);
}