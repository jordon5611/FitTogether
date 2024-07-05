const Chat = require('../../models/Chat');
const User = require('../../models/User');

const userChats = async (req, res) => {
    const userId = req.user.userId;

    const userChats = await Chat.find({ 'participants.userId': userId });

    // Extract other participants' details from the chats
    const otherParticipants = userChats.map(chat => {
        // Filter out the current user from the participants array
        return chat.participants.filter(participant => participant.userId.toString() !== userId);
    });

    // Flatten the array and remove duplicates
    const flattenedParticipants = otherParticipants.flat().filter(participant => participant);

    // Extract unique user IDs
    const uniqueUserIds = [...new Set(flattenedParticipants.map(participant => participant.userId))];

    // Populate user details for each unique user ID
    const populatedParticipants = await Promise.all(uniqueUserIds.map(async userId => {
        const user = await User.findById(userId);
        return user;
    }));

    res.status(200).json({ status: 'success', populatedParticipants });
}

module.exports = { userChats }