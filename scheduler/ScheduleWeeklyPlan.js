const cron = require('node-cron');
const { updateWeeklyPlans } = require('../controllers/exercise&Diet/fetchAndSaveExercise&DietPlans');
const User = require('../models/User');

const scheduleWeeklyPlans = () => {
  // Run this every Sunday at midnight
  cron.schedule('0 0 * * 0', async () => { // Adjust the schedule as needed
    try {
      const users = await User.find({});
      users.forEach(user => {
        updateWeeklyPlans(user._id);
      });
    } catch (error) {
      console.error('Error updating weekly plans:', error);
    }
  });
};

module.exports = scheduleWeeklyPlans;
