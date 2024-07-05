const Message = require('../../models/Message')

const addMessage = async (req, res)=>{
    const {recieverId, senderId, text} = req.body

    const message = new Message({recieverId, senderId, text })

    await message.save()

    res.status(201).json({status: 'success',message})
}

module.exports = { addMessage }