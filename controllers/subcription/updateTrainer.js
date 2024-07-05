
const Subscription = require('../../models/Subscription');
const User = require('../../models/User');
const Chat = require('../../models/Chat');

const { NotFoundError, BadRequestError } = require('../../errors')

const updateTrainer = async (req, res) => {

    const { userId } = req.user; // Assuming user ID is available in req.user
    const { trainerId } = req.body;

    // find the subscription
    const subscription = await Subscription.findOne({ userId }).populate('paymentId');

    if (!subscription) {
        throw new NotFoundError('Subscription not found, First buy subscription');
    }

    if (!subscription.trainerId) {  
        throw new BadRequestError('Trainer already added, Wait for Subscription Expiry');
    }

    // save trainer in user and user in trainer

    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError('User not found');
    }

    const trainer = await User.findById(trainerId);
    if (!trainer) {
        throw new NotFoundError('Trainer not found');
    }

    user.trainer = trainerId;

    trainer.clients.push(userId);
    trainerAmount = (subscription.paymentId.amount)/2;
    trainer.balance = trainer.balance + trainerAmount;

    // delete previous chat of user 

    const previousChat = await Chat.findOne({
        $and: [
            { "participants.userId": userId }
        ]
    });

    if (previousChat) {
        await Chat.findByIdAndDelete(previousChat._id);
    }

    // Check if a chat already exists between these users
    const existingChat = await Chat.findOne({
        $and: [
            { "participants.userId": userId },
            { "participants.userId": trainerId }
        ]
    });

    if (existingChat) {
        //throw new BadRequestError('Chat has Already Created')
    }


    const newChat = new Chat({
        participants : [ 
            {userId : userId},
            {userId: trainerId} 
        ]
    })

    await newChat.save()

    await trainer.save();
    await user.save();

    await subscription.save();

    res.status(201).json({status: 'success', message: 'Updated trainer successfully'});

};

module.exports = { updateTrainer }
