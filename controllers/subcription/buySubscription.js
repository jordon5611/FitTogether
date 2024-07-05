
const Payment = require('../../models/Payment')
const stripe = require('../../HelpingFunctions/stripe')

const { NotFoundError, BadRequestError } = require('../../errors')

const buySubscription = async (req, res) => {



    res.status(201).json({status: 'success', payment})

};

module.exports = { buySubscription }
