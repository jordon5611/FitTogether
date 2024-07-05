const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  day: {
    type: String,
    required: true
  },
  exercises: {
    type: [String],
    required: true
  }
});

const ExercisePlanSchema = new Schema({
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
    type: [ExerciseSchema],
    required: true
  },
  fitnessLevel: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const ExercisePlan = mongoose.model('ExercisePlan', ExercisePlanSchema);
module.exports = ExercisePlan;
