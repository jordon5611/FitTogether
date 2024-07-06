const User = require('../../models/User'); // Adjust the path as necessary
const DietPlan = require('../../models/DietPlan'); // Adjust the path as necessary
//const weekPlans = require('../../HelpingFunctions/weekPlans');

const generateDietPlan = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const { signupQuestions } = user;
    const { fitnessGoals } = signupQuestions;

    let selectedPlans = [];

    fitnessGoals.forEach(goal => {
        if (weekPlans[goal]) {
            selectedPlans.push(weekPlans[goal]);
        }
    });

    // Combine all the selected plans
    const combinedPlan = selectedPlans.reduce((acc, plan) => {
        plan.forEach((dayPlan, index) => {
            if (!acc[index]) {
                acc[index] = { ...dayPlan };
            } else {
                acc[index].proteins += dayPlan.proteins;
                acc[index].fats += dayPlan.fats;
                acc[index].carbohydrates += dayPlan.carbohydrates;
                acc[index].calories += dayPlan.calories;
            }
        });
        return acc;
    }, []);

    const dietPlan = {
        userId,
        name: 'Weekly Diet Plan',
        description: 'A balanced diet plan for the week.',
        weekPlan: combinedPlan,
        dietaryRestrictions: signupQuestions.dietaryRestrictions || []
    };

    let savedDietPlan = await DietPlan.findOne({ userId });
    if (!savedDietPlan) {
        savedDietPlan = await DietPlan.create(dietPlan);
    } else {
        savedDietPlan.weekPlan = dietPlan.weekPlan;
        savedDietPlan.dietaryRestrictions = dietPlan.dietaryRestrictions;
        await savedDietPlan.save();
    }

    console.log('Diet plan saved');
    return savedDietPlan;
};




const weekPlans = {
    'Lose weight': [
        { day: 'Monday', proteins: 50, fats: 20, carbohydrates: 100, calories: 1200 },
        { day: 'Tuesday', proteins: 55, fats: 22, carbohydrates: 110, calories: 1300 },
        { day: 'Wednesday', proteins: 60, fats: 25, carbohydrates: 120, calories: 1400 },
        { day: 'Thursday', proteins: 65, fats: 28, carbohydrates: 130, calories: 1500 },
        { day: 'Friday', proteins: 70, fats: 30, carbohydrates: 140, calories: 1600 },
        { day: 'Saturday', proteins: 75, fats: 32, carbohydrates: 150, calories: 1700 },
        { day: 'Sunday', proteins: 80, fats: 35, carbohydrates: 160, calories: 1800 }
    ],
    'Build muscle': [
        { day: 'Monday', proteins: 70, fats: 30, carbohydrates: 150, calories: 1800 },
        { day: 'Tuesday', proteins: 75, fats: 32, carbohydrates: 160, calories: 1900 },
        { day: 'Wednesday', proteins: 80, fats: 35, carbohydrates: 170, calories: 2000 },
        { day: 'Thursday', proteins: 85, fats: 38, carbohydrates: 180, calories: 2100 },
        { day: 'Friday', proteins: 90, fats: 40, carbohydrates: 190, calories: 2200 },
        { day: 'Saturday', proteins: 95, fats: 42, carbohydrates: 200, calories: 2300 },
        { day: 'Sunday', proteins: 100, fats: 45, carbohydrates: 210, calories: 2400 }
    ],
    'Increase endurance': [
        { day: 'Monday', proteins: 60, fats: 25, carbohydrates: 120, calories: 1500 },
        { day: 'Tuesday', proteins: 65, fats: 28, carbohydrates: 130, calories: 1600 },
        { day: 'Wednesday', proteins: 70, fats: 30, carbohydrates: 140, calories: 1700 },
        { day: 'Thursday', proteins: 75, fats: 32, carbohydrates: 150, calories: 1800 },
        { day: 'Friday', proteins: 80, fats: 35, carbohydrates: 160, calories: 1900 },
        { day: 'Saturday', proteins: 85, fats: 38, carbohydrates: 170, calories: 2000 },
        { day: 'Sunday', proteins: 90, fats: 40, carbohydrates: 180, calories: 2100 }
    ],
    'Improve flexibility': [
        { day: 'Monday', proteins: 55, fats: 22, carbohydrates: 110, calories: 1300 },
        { day: 'Tuesday', proteins: 60, fats: 25, carbohydrates: 120, calories: 1400 },
        { day: 'Wednesday', proteins: 65, fats: 28, carbohydrates: 130, calories: 1500 },
        { day: 'Thursday', proteins: 70, fats: 30, carbohydrates: 140, calories: 1600 },
        { day: 'Friday', proteins: 75, fats: 32, carbohydrates: 150, calories: 1700 },
        { day: 'Saturday', proteins: 80, fats: 35, carbohydrates: 160, calories: 1800 },
        { day: 'Sunday', proteins: 85, fats: 38, carbohydrates: 170, calories: 1900 }
    ],
    'Maintain current fitness level': [
        { day: 'Monday', proteins: 60, fats: 25, carbohydrates: 120, calories: 1500 },
        { day: 'Tuesday', proteins: 65, fats: 28, carbohydrates: 130, calories: 1600 },
        { day: 'Wednesday', proteins: 70, fats: 30, carbohydrates: 140, calories: 1700 },
        { day: 'Thursday', proteins: 75, fats: 32, carbohydrates: 150, calories: 1800 },
        { day: 'Friday', proteins: 80, fats: 35, carbohydrates: 160, calories: 1900 },
        { day: 'Saturday', proteins: 85, fats: 38, carbohydrates: 170, calories: 2000 },
        { day: 'Sunday', proteins: 90, fats: 40, carbohydrates: 180, calories: 2100 }
    ]
};

module.exports = { generateDietPlan };
