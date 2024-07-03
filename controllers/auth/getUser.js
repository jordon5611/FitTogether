const User = require('../../models/User')
const { NotFoundError } = require('../../errors');

const getUser = async (req, res) => {

    const id = req.params.userId

    const user = await User.findById(id);

    if(!user){
        throw new NotFoundError('User not found')
    }


    res.status(200).json({ status: 'success', user });

};

module.exports = { getUser }