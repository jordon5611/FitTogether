const cron = require('node-cron');
const { updateWeeklyPlans } = require('../controllers/exercise&Diet/fetchAndSaveExercise&DietPlans');
const User = require('../models/User');
const Subscription = require('../models/Subscription');

const scheduleWeeklyPlans = () => {
    // Run this every Sunday at midnight
    cron.schedule('0 0 * * 0', async () => { // Adjust the schedule as needed

        const users = await User.find({});
        users.forEach(user => {
            updateWeeklyPlans(user._id);
        });

    });
};

// Schedule task to delete expired subscriptions
const scheduleExpiredSubscriptionsCleanup = () => {
    // Run this every day at midnight
    cron.schedule('0 0 * * *', async () => {
        const currentDate = new Date();
        const expiredSubscriptions = await Subscription.find({
            endDate: { $lt: currentDate }
        });

        if (expiredSubscriptions.length > 0) {
            await Subscription.deleteMany({
                endDate: { $lt: currentDate }
            });

            console.log(`${expiredSubscriptions.length} expired subscriptions deleted`);
        } else {
            console.log('No expired subscriptions found');
        }
    });
};


module.exports = {scheduleWeeklyPlans, scheduleExpiredSubscriptionsCleanup};
