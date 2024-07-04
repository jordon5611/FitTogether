const mongoose = require('mongoose');

const ExercisePlanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    exercises: [
        {
            type: String,
            required: true
        }
    ],
    fitnessLevel: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('ExercisePlan', ExercisePlanSchema);
