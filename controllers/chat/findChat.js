const Chat = require('../../models/Chat');
const { NotFoundError, UnauthorizedError } = require("../../errors")
const User = require("../../models/User")

const findChat = async (req, res) => {

    const id = req.user.userId;

    const chat = await Chat.findOne({
        'participants.userId': { $all: [req.params.userId1, req.params.userId2] },
    });

    res.status(200).json({status: 'success', chat: chat });
} 


module.exports = { findChat }