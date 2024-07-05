const Subscription = require('../../models/Subscription'); // Adjust the path as necessary

const Payment = require('../../models/Payment')
const stripe = require('../../HelpingFunctions/stripe')

const createSubscription = async (req, res) => {
    const { userId, planId, type } = req.body; // Assuming these values come from request body


    const { amount, token } = req.body;


    const charge = await stripe.charges.create({
        source: token,
        amount: amount, // amount in cents
        currency: 'usd',
        description: 'Payment for Subscription',
    });

    const payment = new Payment({
        userId: userId,
        stripeId: charge.id,
        amount: amount
    })

    await payment.save()

    //  endDate will be 1month if type is 1 else 1 year
    const endDate = type === 1 ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    // Want to delete subscription before creating new one

    await Subscription.deleteMany({ userId: userId });

    const newSubscription = new Subscription({
        userId: userId,
        endDate: endDate,
        planId: planId,
        type: type,
        paymentId: payment._id
    });

    const savedSubscription = await newSubscription.save();

    res.status(201).json({ status: 'success',subscription: savedSubscription, message: 'Subscription created successfully' });

};

module.exports = { createSubscription };