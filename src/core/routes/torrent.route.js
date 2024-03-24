module.exports = app => {
    const TorrentController = require('../controllers/torrent.controller');
    const AuthMiddleware = require('../middlewares/auth.middleware');
    /**
     * GET
     */
    app.get('/last', TorrentController.getLastTorrents);
    app.get('/best', TorrentController.getBestTorrents);
    app.get('/download/:id', AuthMiddleware.checkToken, TorrentController.download);

    /**
     * POST
     */
    app.post('/upload', AuthMiddleware.checkToken, TorrentController.upload);
}