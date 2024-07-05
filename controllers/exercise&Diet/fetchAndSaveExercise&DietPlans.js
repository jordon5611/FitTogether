const axios = require('axios');
const DietPlan = require('../../models/DietPlan');
const ExercisePlan = require('../../models/ExercisePlan');
const { createMealPlan } = require('./createMealPlan');
require("dotenv").config();



const fetchAndSaveExercisePlans = async (userId) => {
  try {
    const response = await axios.get('https://wger.de/api/v2/exercise/', {
      params: {
        language: 2,
        status: 2
      }
    });

    const exercises = response.data.results.map(result => result.name);
    console.log('Exercises:', exercises);

    const exercisePlan = {
      userId,
      name: 'Weekly Exercise Plan',
      description: 'A comprehensive exercise plan for the week.',
      weekPlan: [
        { day: 'Monday', exercises },
        { day: 'Tuesday', exercises },
        { day: 'Wednesday', exercises },
        { day: 'Thursday', exercises },
        { day: 'Friday', exercises },
        { day: 'Saturday', exercises },
        { day: 'Sunday', exercises }
      ],
      fitnessLevel: 'Intermediate'
    };

    let savedExercisePlan = await ExercisePlan.findOne({ userId });
    if (!savedExercisePlan) {
      savedExercisePlan = await ExercisePlan.create(exercisePlan);
    } else {
      savedExercisePlan.weekPlan = exercisePlan.weekPlan;
      await savedExercisePlan.save();
    }

    console.log('Exercise plan saved');
  } catch (error) {
    console.error('Error fetching exercise plans:', error.response ? error.response.data : error.message);
  }
};

const updateWeeklyPlans = async (userId) => {
  await createMealPlan(userId);
  await fetchAndSaveExercisePlans(userId);
  console.log('Weekly plans updated');
};

module.exports = { updateWeeklyPlans };
