module.exports = app => {
    const TorrentController = require('../controllers/torrent.controller');
    const AuthMiddleware = require('../middlewares/auth.middleware');
    /**
     * GET
     */
    app.get('/torrents/last', TorrentController.getLastTorrents);
    app.get('/torrents/best', TorrentController.getBestTorrents);
    app.get('/torrents/download/:id', AuthMiddleware.checkToken, TorrentController.download);

    /**
     * POST
     */
    app.post('/torrents/upload', AuthMiddleware.checkToken, TorrentController.upload);
}