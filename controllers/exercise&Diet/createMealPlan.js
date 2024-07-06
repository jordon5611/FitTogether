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
                acc[index].image = acc[index].image || dayPlan.image; // Keep the first image encountered
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
        { day: 'Monday', proteins: 50, fats: 20, carbohydrates: 100, calories: 1200, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-12.jpeg?alt=media&token=5264ea5f-7141-4893-9517-4d922f68876e' },
        { day: 'Tuesday', proteins: 55, fats: 22, carbohydrates: 110, calories: 1300, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-13.jpeg?alt=media&token=9faf9a27-86a9-4951-8a41-d1d63025d5fe' },
        { day: 'Wednesday', proteins: 60, fats: 25, carbohydrates: 120, calories: 1400, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-15.jpeg?alt=media&token=46f8e318-700f-4cda-860d-011ab706eaf5' },
        { day: 'Thursday', proteins: 65, fats: 28, carbohydrates: 130, calories: 1500, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-12.jpeg?alt=media&token=5264ea5f-7141-4893-9517-4d922f68876e' },
        { day: 'Friday', proteins: 70, fats: 30, carbohydrates: 140, calories: 1600, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-13.jpeg?alt=media&token=9faf9a27-86a9-4951-8a41-d1d63025d5fe' },
        { day: 'Saturday', proteins: 75, fats: 32, carbohydrates: 150, calories: 1700, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-14.jpeg?alt=media&token=416e7458-013d-4cbf-a74e-6f7ba191df26' },
        { day: 'Sunday', proteins: 80, fats: 35, carbohydrates: 160, calories: 1800, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-11.jpeg?alt=media&token=657671d4-af4f-41e6-8cc0-6c77c93216d4' }
    ],
    'Build muscle': [
        { day: 'Monday', proteins: 70, fats: 30, carbohydrates: 150, calories: 1800, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-14.jpeg?alt=media&token=416e7458-013d-4cbf-a74e-6f7ba191df26' },
        { day: 'Tuesday', proteins: 75, fats: 32, carbohydrates: 160, calories: 1900, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-12.jpeg?alt=media&token=5264ea5f-7141-4893-9517-4d922f68876e' },
        { day: 'Wednesday', proteins: 80, fats: 35, carbohydrates: 170, calories: 2000, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-13.jpeg?alt=media&token=9faf9a27-86a9-4951-8a41-d1d63025d5fe' },
        { day: 'Thursday', proteins: 85, fats: 38, carbohydrates: 180, calories: 2100, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-15.jpeg?alt=media&token=46f8e318-700f-4cda-860d-011ab706eaf5' },
        { day: 'Friday', proteins: 90, fats: 40, carbohydrates: 190, calories: 2200, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-12.jpeg?alt=media&token=5264ea5f-7141-4893-9517-4d922f68876e' },
        { day: 'Saturday', proteins: 95, fats: 42, carbohydrates: 200, calories: 2300, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-13.jpeg?alt=media&token=9faf9a27-86a9-4951-8a41-d1d63025d5fe' },
        { day: 'Sunday', proteins: 100, fats: 45, carbohydrates: 210, calories: 2400, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-11.jpeg?alt=media&token=657671d4-af4f-41e6-8cc0-6c77c93216d4' }
    ],
    'Increase endurance': [
        { day: 'Monday', proteins: 60, fats: 25, carbohydrates: 120, calories: 1500, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-13.jpeg?alt=media&token=9faf9a27-86a9-4951-8a41-d1d63025d5fe' },
        { day: 'Tuesday', proteins: 65, fats: 28, carbohydrates: 130, calories: 1600, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-12.jpeg?alt=media&token=5264ea5f-7141-4893-9517-4d922f68876e' },
        { day: 'Wednesday', proteins: 70, fats: 30, carbohydrates: 140, calories: 1700, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-14.jpeg?alt=media&token=416e7458-013d-4cbf-a74e-6f7ba191df26' },
        { day: 'Thursday', proteins: 75, fats: 32, carbohydrates: 150, calories: 1800, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-13.jpeg?alt=media&token=9faf9a27-86a9-4951-8a41-d1d63025d5fe' },
        { day: 'Friday', proteins: 80, fats: 35, carbohydrates: 160, calories: 1900, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-12.jpeg?alt=media&token=5264ea5f-7141-4893-9517-4d922f68876e' },
        { day: 'Saturday', proteins: 85, fats: 38, carbohydrates: 170, calories: 2000, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-15.jpeg?alt=media&token=46f8e318-700f-4cda-860d-011ab706eaf5' },
        { day: 'Sunday', proteins: 90, fats: 40, carbohydrates: 180, calories: 2100, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-11.jpeg?alt=media&token=657671d4-af4f-41e6-8cc0-6c77c93216d4' }
    ],
    'Improve flexibility': [
        { day: 'Monday', proteins: 55, fats: 22, carbohydrates: 110, calories: 1300, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-13.jpeg?alt=media&token=9faf9a27-86a9-4951-8a41-d1d63025d5fe' },
        { day: 'Tuesday', proteins: 60, fats: 25, carbohydrates: 120, calories: 1400, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-12.jpeg?alt=media&token=5264ea5f-7141-4893-9517-4d922f68876e' },
        { day: 'Wednesday', proteins: 65, fats: 28, carbohydrates: 130, calories: 1500, image: 'https://example.com/images/improve_flexibility_wednesday.jpg' },
        { day: 'Thursday', proteins: 70, fats: 30, carbohydrates: 140, calories: 1600, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-12.jpeg?alt=media&token=5264ea5f-7141-4893-9517-4d922f68876e' },
        { day: 'Friday', proteins: 75, fats: 32, carbohydrates: 150, calories: 1700, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-15.jpeg?alt=media&token=46f8e318-700f-4cda-860d-011ab706eaf5' },
        { day: 'Saturday', proteins: 80, fats: 35, carbohydrates: 160, calories: 1800, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-13.jpeg?alt=media&token=9faf9a27-86a9-4951-8a41-d1d63025d5fe' },
        { day: 'Sunday', proteins: 85, fats: 38, carbohydrates: 170, calories: 1900, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-11.jpeg?alt=media&token=657671d4-af4f-41e6-8cc0-6c77c93216d4' }
    ],
    'Maintain current fitness level': [
        { day: 'Monday', proteins: 60, fats: 25, carbohydrates: 120, calories: 1500, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-12.jpeg?alt=media&token=5264ea5f-7141-4893-9517-4d922f68876e' },
        { day: 'Tuesday', proteins: 65, fats: 28, carbohydrates: 130, calories: 1600, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-14.jpeg?alt=media&token=416e7458-013d-4cbf-a74e-6f7ba191df26' },
        { day: 'Wednesday', proteins: 70, fats: 30, carbohydrates: 140, calories: 1700, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-13.jpeg?alt=media&token=9faf9a27-86a9-4951-8a41-d1d63025d5fe' },
        { day: 'Thursday', proteins: 75, fats: 32, carbohydrates: 150, calories: 1800, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-15.jpeg?alt=media&token=46f8e318-700f-4cda-860d-011ab706eaf5' },
        { day: 'Friday', proteins: 80, fats: 35, carbohydrates: 160, calories: 1900, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-12.jpeg?alt=media&token=5264ea5f-7141-4893-9517-4d922f68876e' },
        { day: 'Saturday', proteins: 85, fats: 38, carbohydrates: 170, calories: 2000, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-14.jpeg?alt=media&token=416e7458-013d-4cbf-a74e-6f7ba191df26' },
        { day: 'Sunday', proteins: 90, fats: 40, carbohydrates: 180, calories: 2100, image: 'https://firebasestorage.googleapis.com/v0/b/fittogether-5bb9a.appspot.com/o/recorded-videos%2Ffire-11.jpeg?alt=media&token=657671d4-af4f-41e6-8cc0-6c77c93216d4' }
    ]
};




module.exports = { generateDietPlan };
