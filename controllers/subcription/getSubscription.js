const Subscription = require('../../models/Subscription');
const { NotFoundError } = require('../../errors');


const getSubscription = async (req, res) => {
    const { userId } = req.user;
    const subscription = await Subscription.findOne({ userId });
    
    if (!subscription) {
        throw new NotFoundError('Subscription not found');
    }
    res.status(200).json({ status: 'success', subscription });
};

module.exports = { getSubscription };
