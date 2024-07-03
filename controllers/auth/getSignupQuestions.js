const signupQuestions = require('../../HelpingFunctions/signupQuestions')

const getSignupQuestions = async (req, res) => {


    res.status(200).json({status:'success', signupQuestions })

};

module.exports = { getSignupQuestions };

