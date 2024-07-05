const Message = require('../../models/Message')

const getMessages = async (req, res)=>{
    const { recieverId } = req.body

    const senderId = req.user.userId

    const messages = await Message.find({
        $or: [
            { senderId, recieverId },
            { senderId: recieverId, recieverId: senderId }
        ]
    });

    res.status(200).json({status: 'success',messages})
}

module.exports = { getMessages }