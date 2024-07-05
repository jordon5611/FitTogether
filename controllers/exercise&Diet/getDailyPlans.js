const DietPlan = require('../../models/DietPlan');
const ExercisePlan = require('../../models/ExercisePlan');

const getDailyPlans = async (req, res) => {
  const userId = req.user.userId;

  const dayOfWeek = new Date().toLocaleString('en-US', { weekday: 'long' });

  const dietPlan = await DietPlan.findOne({ userId });
  const exercisePlan = await ExercisePlan.findOne({ userId });

  const dailyDietPlan = dietPlan ? dietPlan.weekPlan.find(plan => plan.day === dayOfWeek) : null;
  const dailyExercisePlan = exercisePlan ? exercisePlan.weekPlan.find(plan => plan.day === dayOfWeek) : null;

  res.status(200).json({
    status: 'success',
    data: {
      dietPlan: dailyDietPlan,
      exercisePlan: dailyExercisePlan
    }
  });
};

module.exports = { getDailyPlans };
