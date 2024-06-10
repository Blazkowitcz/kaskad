const cron = require('node-cron');
const PeerModel = require('../../models/peer.model');

cron.schedule('*/30 * * * *', async () => {
    const peers = await PeerModel.find();
    for(const peer of peers){
        const diff = Math.floor(Math.abs(new Date() - new Date(peer.date)) / (1000 * 60));
        if(diff > 60){
            await PeerModel.deleteOne({_id: peer._id});
        }
    }
});