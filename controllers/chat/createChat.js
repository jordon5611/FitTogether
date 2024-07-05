const Chat = require('../../models/Chat');
const { NotFoundError, BadRequestError } = require("../../errors")
const User = require("../../models/User")

const createChat = async (req, res) => {

    const SenderId = req.body.senderId
    const RecieverId = req.body.receiverId

    const user1 = await User.findById(SenderId);
    const user2 = await User.findById(RecieverId);

    if (!user1 || !user2) {
      throw new NotFoundError('One or more users not found');
    }

    // Check if a chat already exists between these users
    const existingChat = await Chat.findOne({
        $and: [
            { "participants.userId": SenderId },
            { "participants.userId": RecieverId }
        ]
    });

    if (existingChat) {
        throw new BadRequestError('Chat has Already Created')
    }


    const newChat = new Chat({
        participants : [ 
            {userId : SenderId},
            {userId: RecieverId} 
        ]
    })

    await newChat.save()

    const populatedChat = await Chat.populate(newChat, { path: 'participants.userId' });

    res.status(200).json({status: 'success',chat: populatedChat})
} 


module.exports = { createChat }