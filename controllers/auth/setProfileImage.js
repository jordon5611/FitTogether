const User = require('../../models/User');
const { NotFoundError, BadRequestError } = require('../../errors');

const multer = require('multer');


const setProfileImage = async (req, res) => {
    const id = req.user.userId;

    //MULTER ERROR CHECK
    if (req.file instanceof multer.MulterError) {
        throw new BadRequestError('File upload error');
    } else if (!req.file) {
        throw new BadRequestError('No file provided');
    }

    const user = await User.findById(id);

    if (!user) {
        throw new NotFoundError('User not Found')
    }
    const pdfUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    user.profileImage = pdfUrl;

    await user.save();

    res.status(200).json({status:'success', data: user})

};

module.exports = { setProfileImage };
