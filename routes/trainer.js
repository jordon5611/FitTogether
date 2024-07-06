// controllers/trainerController.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

const Subscription = require('../models/Subscription');
const { NotFoundError, BadRequestError } = require('../errors');

//Middlewares

const Authentication = require('../middleware/authentication')

// Function to add a trainer
// router.post('/addTrainer', Authentication, async (req, res) => {
//     const { trainerId } = req.body;

//     const userId = req.user.userId

//     const user = await User.findById(userId);
//     if (!user) {
//         throw new NotFoundError('User not found');
//     }

//     const trainer = await User.findById(trainerId);
//     if (!trainer) {
//         throw new NotFoundError('Trainer not found');
//     }

//     user.trainer = trainerId;

//     trainer.clients.push(userId);

//     // Check if a chat already exists between these users
//     const existingChat = await Chat.findOne({
//         $and: [
//             { "participants.userId": userId },
//             { "participants.userId": trainerId }
//         ]
//     });

//     if (existingChat) {
//         throw new BadRequestError('Chat has Already Created')
//     }


//     const newChat = new Chat({
//         participants : [ 
//             {userId : userId},
//             {userId: trainerId} 
//         ]
//     })

//     await newChat.save()

//     await trainer.save();
//     await user.save();

//     res.status(200).json({ status: 'success', message: 'Trainer added successfully', user });

// });

// Function to add a certificate
router.post('/addCertificate', Authentication, async (req, res) => {
    const { certificateDoc } = req.body;

    const userId = req.user.userId

    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError('User not found');
    }

    user.certificate.doc = certificateDoc;
    user.certificate.status = 'Pending';
    await user.save();

    res.status(200).json({ status: 'success', message: 'Certificate added successfully', user });

});

// get trainer all clients
router.get('/getClients', Authentication, async (req, res) => {
    const userId = req.user.userId
    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError('User not found');
    }
    const clients = await User.find({ trainer: user._id });


    // Fetch subscription end dates for each client
    const clientsWithSubscriptions = await Promise.all(clients.map(async (client) => {
        const subscription = await Subscription.findOne({ userId: client._id }).sort({ endDate: -1 }); // Fetch the latest subscription
        return {
            ...client.toObject(),
            subscriptionEndDate: subscription ? subscription.endDate : null
        };
    }));

    res.status(200).json({ status: 'success', clientsWithSubscriptions });
});

//update trainer bankDetails
router.post('/updateBankDetails', Authentication, async (req, res) => {
    const { bankName, accountNumber, accountHolderName } = req.body;

    const userId = req.user.userId
    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError('User not found');
    }

    // Only trainers can have bank details updated
    if (user.userType !== 'trainer') {
        return res.status(400).json({ message: 'User is not a trainer' });
    }

    user.bankDetails.bankName = bankName;
    user.bankDetails.accountNumber = accountNumber;
    user.bankDetails.accountHolderName = accountHolderName;

    await user.save();

    res.status(200).json({ status: 'success', message: 'Bank details updated successfully', user });

});

// get all trainer 
router.get('/getAllTrainer', Authentication, async (req, res) => {
    const userId = req.user.userId

    const user = await User.findById(userId);

    if (!user) {
        throw new NotFoundError('User not found');
    }

    //all trainers except user.trainer

    const trainers = await User.find({ userType: 'trainer', _id: { $ne: user.trainer } });

    res.status(200).json({ status: 'success', trainers });
});

//balance, users of trainer
router.get('/getTrainerDashboard', Authentication, async (req, res) => {
    const userId = req.user.userId
    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError('User not found');
    }

    if (user.userType !== 'trainer') {
        throw new BadRequestError('Only trainers can access this route');
    }

    //clients of trainers in number

    const clients = await User.countdocuments({ trainer: user._id });

    res.status(200).json({ status: 'success', balance: user.balance, users: clients });

});


module.exports = router;
