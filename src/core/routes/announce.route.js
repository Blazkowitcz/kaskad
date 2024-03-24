module.exports = app => {
    const AnnounceController = require('../controllers/announce.controller');

    app.get('/announce/:passkey', AnnounceController.announce);
}