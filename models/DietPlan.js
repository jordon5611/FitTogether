const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DayPlanSchema = new Schema({
  day: {
    type: String,
    required: true
  },
  proteins: {
    type: Number,
    required: true
  },
  fats: {
    type: Number,
    required: true
  },
  carbohydrates: {
    type: Number,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: false
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
    type: [DayPlanSchema],
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
