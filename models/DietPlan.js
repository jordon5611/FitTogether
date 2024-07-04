const mongoose = require('mongoose');

const DietPlanSchema = new mongoose.Schema({
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
    meals: [
        {
            type: String,
            required: true
        }
    ],
    dietaryRestrictions: {
        type: [String],
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('DietPlan', DietPlanSchema);
