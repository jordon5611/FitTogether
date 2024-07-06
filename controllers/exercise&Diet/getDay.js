//get Day of user account created
const User = require('../../models/User')
const { NotFoundError } = require('../../errors');

const getDay = async (req, res) => {
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError('User not found');
    }

    // Get the current date
    const currentDate = new Date();

    // Get the account creation date
    const accountCreationDate = user.createdAt;

    // Calculate the difference in milliseconds
    const diffInMs = currentDate - accountCreationDate;

    // Convert milliseconds to days
    let days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    days = days + 1;


    res.status(200).json({ status: 'success', days });
};

module.exports = { getDay }