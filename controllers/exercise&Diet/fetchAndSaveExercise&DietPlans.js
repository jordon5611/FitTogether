const axios = require('axios');
const DietPlan = require('../../models/DietPlan');
const ExercisePlan = require('../../models/ExercisePlan');

const fetchAndSaveDietPlans = async (userId) => {

  // Fetch diet plan from external API (this is just a placeholder)
  const response = await axios.get('https://trackapi.nutritionix.com/v2/search/instant', {
    headers: {
      'x-app-id': process.env.NUTRITIONIX_APP_ID,
      'x-app-key': process.env.NUTRITIONIX_APP_KEY
    },
    params: {
      query: 'meal'
    }
  });

  const dietPlan = {
    userId,
    name: 'Weekly Diet Plan',
    description: 'A balanced diet plan for the week.',
    weekPlan: [
      { day: 'Monday', meals: ['Meal 1', 'Meal 2', 'Meal 3'] },
      { day: 'Tuesday', meals: ['Meal 1', 'Meal 2', 'Meal 3'] },
      { day: 'Wednesday', meals: ['Meal 1', 'Meal 2', 'Meal 3'] },
      { day: 'Thursday', meals: ['Meal 1', 'Meal 2', 'Meal 3'] },
      { day: 'Friday', meals: ['Meal 1', 'Meal 2', 'Meal 3'] },
      { day: 'Saturday', meals: ['Meal 1', 'Meal 2', 'Meal 3'] },
      { day: 'Sunday', meals: ['Meal 1', 'Meal 2', 'Meal 3'] },
    ],
    dietaryRestrictions: []
  };

  await DietPlan.create(dietPlan);
  console.log('Diet plan saved');

};

const fetchAndSaveExercisePlans = async (userId) => {

  // Fetch exercise plan from external API (this is just a placeholder)
  const response = await axios.get('https://wger.de/api/v2/exercise/', {
    params: {
      language: 2,
      status: 2
    }
  });

  const exercisePlan = {
    userId,
    name: 'Weekly Exercise Plan',
    description: 'A comprehensive exercise plan for the week.',
    weekPlan: [
      { day: 'Monday', exercises: ['Exercise 1', 'Exercise 2', 'Exercise 3'] },
      { day: 'Tuesday', exercises: ['Exercise 1', 'Exercise 2', 'Exercise 3'] },
      { day: 'Wednesday', exercises: ['Exercise 1', 'Exercise 2', 'Exercise 3'] },
      { day: 'Thursday', exercises: ['Exercise 1', 'Exercise 2', 'Exercise 3'] },
      { day: 'Friday', exercises: ['Exercise 1', 'Exercise 2', 'Exercise 3'] },
      { day: 'Saturday', exercises: ['Exercise 1', 'Exercise 2', 'Exercise 3'] },
      { day: 'Sunday', exercises: ['Exercise 1', 'Exercise 2', 'Exercise 3'] },
    ],
    fitnessLevel: 'Intermediate'
  };

  await ExercisePlan.create(exercisePlan);
  console.log('Exercise plan saved');

};

const updateWeeklyPlans = async (userId) => {
  await fetchAndSaveDietPlans(userId);
  await fetchAndSaveExercisePlans(userId);
  console.log('Weekly plans updated');
};

module.exports = { updateWeeklyPlans };
