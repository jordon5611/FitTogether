const User = require('../../models/User');
const { NotFoundError } = require("../../errors");
const { updateWeeklyPlans } = require('../exercise&Diet/fetchAndSaveExercise&DietPlans');

const updateSignupQuestions = async (req, res) => {
    const { userId } = req.user; // Assuming user ID is available in req.user
    const {
        fitnessGoals,
        currentWorkoutRoutine,
        dietaryRestrictions,
        medicalConditions,
        preferredWorkoutTime,
        workoutFrequency,
        previousInjuries,
        currentFitnessLevel
    } = req.body;


    const user = await User.findById(userId);

    if (!user) {
        throw new NotFoundError('User not found');
    }

    user.signupQuestions.fitnessGoals = fitnessGoals || user.signupQuestions.fitnessGoals;
    user.signupQuestions.currentWorkoutRoutine = currentWorkoutRoutine || user.signupQuestions.currentWorkoutRoutine;
    user.signupQuestions.dietaryRestrictions = dietaryRestrictions || user.signupQuestions.dietaryRestrictions;
    user.signupQuestions.medicalConditions = medicalConditions || user.signupQuestions.medicalConditions;
    user.signupQuestions.preferredWorkoutTime = preferredWorkoutTime || user.signupQuestions.preferredWorkoutTime;
    user.signupQuestions.workoutFrequency = workoutFrequency || user.signupQuestions.workoutFrequency;
    user.signupQuestions.previousInjuries = previousInjuries || user.signupQuestions.previousInjuries;
    user.signupQuestions.currentFitnessLevel = currentFitnessLevel || user.signupQuestions.currentFitnessLevel;

    await updateWeeklyPlans(userId);

    await user.save();

    res.status(200).json({ status: 'success', user , message: 'Updated successfully' });
};

module.exports = { updateSignupQuestions };
