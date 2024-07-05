const User = require('../../models/User');
const { NotFoundError, BadRequestError } = require('../../errors');

const multer = require('multer');


const setProfileImage = async (req, res) => {
    const id = req.user.userId;
    const { profileImageUrl } = req.body;

    const user = await User.findById(id);

    if (!user) {
        throw new NotFoundError('User not Found')
    }


    user.profileImage = profileImageUrl;

    await user.save();

    res.status(200).json({status:'success', data: user})

};

module.exports = { setProfileImage };
