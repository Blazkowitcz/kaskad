module.exports = app => {
    const TorrentController = require('../controllers/torrent.controller');

    app.get('/last', TorrentController.getLastTorrents);
    app.get('/best', TorrentController.getBestTorrents);
}