const axios = require('axios');
const DietPlan = require('../../models/DietPlan');
const ExercisePlan = require('../../models/ExercisePlan');
const { generateDietPlan } = require('./createMealPlan');
require('dotenv').config();


const fetchAndSaveExercisePlans = async (userId) => {
  try {
    const response = await axios.get('https://wger.de/api/v2/exercise/', {
      params: {
        language: 2,
        status: 3
      }
    });

    const exercises = response.data.results;

    const fetchExerciseImage = async (exerciseId) => {
      const response = await axios.get(`https://wger.de/api/v2/exerciseimage/?exercise=${exerciseId}`);
      const images = response.data.results;
      return images.length > 0 ? images[0].image : 'https://via.placeholder.com/150'; // Use a placeholder image if no image is found
    };

    const exerciseData = await Promise.all(
      exercises.map(async (exercise) => {
        const image = await fetchExerciseImage(exercise.id);
        return {
          name: exercise.name,
          image
        };
      })
    );

    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const generateDailyExercises = (exerciseData, numExercises) => {
      const shuffledExercises = shuffleArray([...exerciseData]);
      return shuffledExercises.slice(0, numExercises);
    };

    const exercisePlan = {
      userId,
      name: 'Weekly Exercise Plan',
      description: 'A comprehensive exercise plan for the week.',
      weekPlan: [
        { day: 'Monday', exercises: generateDailyExercises(exerciseData, 5) },
        { day: 'Tuesday', exercises: generateDailyExercises(exerciseData, 5) },
        { day: 'Wednesday', exercises: generateDailyExercises(exerciseData, 5) },
        { day: 'Thursday', exercises: generateDailyExercises(exerciseData, 5) },
        { day: 'Friday', exercises: generateDailyExercises(exerciseData, 5) },
        { day: 'Saturday', exercises: generateDailyExercises(exerciseData, 5) },
        { day: 'Sunday', exercises: generateDailyExercises(exerciseData, 5) }
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
    console.error('Error fetching and saving exercise plans:', error.message);
  }
};

module.exports = { fetchAndSaveExercisePlans };


const updateWeeklyPlans = async (userId) => {
  await generateDietPlan(userId);
  await fetchAndSaveExercisePlans(userId);
  console.log('Weekly plans updated');
};

module.exports = { updateWeeklyPlans };
