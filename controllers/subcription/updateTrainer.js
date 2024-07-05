
const Subscription = require('../../models/Subscription');

const { NotFoundError, BadRequestError } = require('../../errors')

const updateTrainer = async (req, res) => {


    const { userId } = req.user; // Assuming user ID is available in req.user

    // find the subscription
    const subscription = await Subscription.findOne({ userId });

    if (!subscription) {
        throw new NotFoundError('Subscription not found');
    }
    subscription.trainerId = req.body.trainerId;

    await subscription.save();

    res.status(201).json({status: 'success', message: 'Updated trainer successfully'});

};

module.exports = { updateTrainer }
