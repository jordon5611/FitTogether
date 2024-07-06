const DietPlan = require('../../models/DietPlan');
const ExercisePlan = require('../../models/ExercisePlan');

const getDailyPlans = async (req, res) => {

  const userId = req.user.userId;

  // Get the current day of the week
  const dayOfWeek = new Date().toLocaleString('en-US', { weekday: 'long' });
  console.log(`Fetching plans for ${dayOfWeek}`);

  // Fetch the diet plan and exercise plan for the user
  const dietPlan = await DietPlan.findOne({ userId });
  const exercisePlan = await ExercisePlan.findOne({ userId });

  console.log(`Diet Plan for User ID ${userId}:`, dietPlan);

  // Find the daily plan for the current day
  const dailyDietPlan = dietPlan ? dietPlan.weekPlan.find(plan => plan.day === dayOfWeek) : null;
  const dailyExercisePlan = exercisePlan ? exercisePlan.weekPlan.find(plan => plan.day === dayOfWeek) : null;

  // Log retrieved plans for debugging
  console.log(`Diet plan for ${dayOfWeek}:`, dailyDietPlan);
  console.log(`Exercise plan for ${dayOfWeek}:`, dailyExercisePlan);

  res.status(200).json({
    status: 'success',
    data: {
      dietPlan: dailyDietPlan,
      exercisePlan: dailyExercisePlan
    }
  });

};

module.exports = { getDailyPlans };
