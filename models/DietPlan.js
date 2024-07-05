const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MealSchema = new Schema({
  day: {
    type: String,
    required: true
  },
  meals: {
    type: [String],
    required: true
  }
});

const DietPlanSchema = new Schema({
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
  weekPlan: {
    type: [MealSchema],
    required: true
  },
  dietaryRestrictions: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

const DietPlan = mongoose.model('DietPlan', DietPlanSchema);
module.exports = DietPlan;
