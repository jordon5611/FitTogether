const express = require('express');
const { body, param } = require('express-validator');
const User = require('../models/User');

//Middlewares

const validatorMiddleware = require('../middleware/Validator-MiddleWare');
const Authentication = require('../middleware/authentication')

//Router
const router = express.Router()

//admin will get all trainers who's certificate.status is pending
router.get('/getPendingTrainers', Authentication, async (req, res) => {
    const trainers = await User.find({ 
        userType: 'trainer', 
        'certificate.status': 'Pending' 
    });
    
    res.status(200).json({ status: 'success', trainers });


})

//approveTrainers
router.patch('/approveTrainers/:id', Authentication, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const trainer = await User.findById(id);
    if (!trainer) {
        throw new NotFoundError('Trainer not found');
    }
    trainer.certificate.status = status;
    await trainer.save();
    res.status(200).json({ status: 'success', trainer });
})

//clear trainer balance
router.patch('/clearTrainerBalance/:id', Authentication, async (req, res) => {
    const { id } = req.params;
    const trainer = await User.findById(id);
    if (!trainer) {
        throw new NotFoundError('Trainer not found');
    }
    trainer.balance = 0;
    await trainer.save();
    res.status(200).json({ status: 'success', trainer });
})



module.exports = router