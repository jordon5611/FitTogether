const axios = require('axios');
const DietPlan = require('../../models/DietPlan');
require("dotenv").config();

const createMealPlan = async (userId) => {
  try {
    const response = await axios.post(`https://api.edamam.com/api/meal-planner/v1/${process.env.EDAMAM_APP_ID}/select`, {
      size: 7,
      plan: {
        accept: {
          all: [
            {
              health: ["SOY_FREE", "FISH_FREE", "MEDITERRANEAN"]
            }
          ]
        },
        fit: {
          ENERC_KCAL: { min: 1000, max: 2000 },
          "SUGAR.added": { max: 20 }
        },
        sections: {
          Breakfast: {
            accept: {
              all: [
                {
                  dish: ["drinks", "egg", "biscuits and cookies", "bread", "pancake", "cereals"]
                },
                {
                  meal: ["breakfast"]
                }
              ]
            },
            fit: {
              ENERC_KCAL: { min: 100, max: 600 }
            }
          },
          Lunch: {
            accept: {
              all: [
                {
                  dish: ["main course", "pasta", "egg", "salad", "soup", "sandwiches", "pizza", "seafood"]
                },
                {
                  meal: ["lunch/dinner"]
                }
              ]
            },
            fit: {
              ENERC_KCAL: { min: 300, max: 900 }
            }
          },
          Dinner: {
            accept: {
              all: [
                {
                  dish: ["seafood", "egg", "salad", "pizza", "pasta", "main course"]
                },
                {
                  meal: ["lunch/dinner"]
                }
              ]
            },
            fit: {
              ENERC_KCAL: { min: 200, max: 900 }
            }
          }
        }
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const meals = response.data.selection.map(selection => {
      const dayMeals = {};
      for (const section in selection.sections) {
        dayMeals[section] = selection.sections[section].assigned;
      }
      return dayMeals;
    });

    const dietPlan = {
      userId,
      name: 'Weekly Diet Plan',
      description: 'A balanced diet plan for the week.',
      weekPlan: [
        { day: 'Monday', meals: meals[0] },
        { day: 'Tuesday', meals: meals[1] },
        { day: 'Wednesday', meals: meals[2] },
        { day: 'Thursday', meals: meals[3] },
        { day: 'Friday', meals: meals[4] },
        { day: 'Saturday', meals: meals[5] },
        { day: 'Sunday', meals: meals[6] }
      ],
      dietaryRestrictions: []
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
  } catch (error) {
    console.error('Error fetching diet plans:', error.response ? error.response.data : error.message);
  }
};

module.exports = { createMealPlan };
