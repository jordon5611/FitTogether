const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  }
});

const DayExerciseSchema = new Schema({
  day: {
    type: String,
    required: true
  },
  exercises: {
    type: [ExerciseSchema],
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
    type: [DayExerciseSchema],
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
