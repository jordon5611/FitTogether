const axios = require('axios');
const DietPlan = require('../../models/DietPlan');
const ExercisePlan = require('../../models/ExercisePlan');
const { generateDietPlan } = require('./createMealPlan');
require('dotenv').config();

const fetchAndSaveExercisePlans = async (userId) => {
  try {
    // Function to shuffle exercises for variety
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    // Generate varied exercise plans for each day
    const generateDailyExercises = (exerciseData, numExercises) => {
      const shuffledExercises = shuffleArray([...exerciseData]);
      return shuffledExercises.slice(0, numExercises);
    };

    // Construct the weekly exercise plan
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

    // Save the exercise plan to the database
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


const updateWeeklyPlans = async (userId) => {
  await generateDietPlan(userId);
  await fetchAndSaveExercisePlans(userId);
  console.log('Weekly plans updated');
};



const exerciseData = [
  { name: '2 Handed Kettlebell Swing', image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-1.jpeg?alt=media&token=2883fdc6-c5a4-4290-a1fd-3b137e822d55' },
  { name: '3D lunge warmup', image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-2.jpeg?alt=media&token=72a91ba7-e098-4938-b23b-9e0a9b83c273' },
  { name: '4-count burpees', image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-3.jpeg?alt=media&token=1915cd3d-d125-4edf-acb2-9147ba017a5f' },
  { name: 'Abdominal Stabilization', image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-4.jpeg?alt=media&token=fd507ca9-ec92-4f22-9ce1-5f61faccb7cc' },
  { name: 'Abdominales sovieticas', image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-5.jpeg?alt=media&token=2ace0ccb-5542-4f40-81d6-abdf91673383' },
  { name: 'Abduktion im Stand', image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-6.jpeg?alt=media&token=f6867016-c3de-4bcc-b36d-938687f1eb4c' },
  { name: 'Adduktorenmaschine', image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-7.jpeg?alt=media&token=95cd1679-7c98-4ef1-8cfa-0237618a7966' },
  { name: 'Alternate back lunges', image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-8.jpeg?alt=media&token=e0223f01-1d26-4211-ada5-9608def13703' },
  { name: 'Alternating Biceps Curls With Dumbbell', image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-9.jpeg?alt=media&token=5d838744-58dc-4d92-b976-855824e696b5' },
  { name: 'Arnold Shoulder Press', image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-10.jpeg?alt=media&token=7bfeae4c-cc64-4618-97d8-03bec63d0927' },
];




module.exports = { updateWeeklyPlans };
