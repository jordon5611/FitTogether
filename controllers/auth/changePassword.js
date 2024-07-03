//Create New password
const { NotFoundError, UnauthorizedError } = require("../../errors")
//const User = require("../../models/User")

const changePassword = async (req, res) =>{
    // const id = req.user.userId;

    // const {currentpassword, newpassword} = req.body

    // const user = await User.findById(id)

    // if (!user){
    //     throw new NotFoundError('User not Found!')
    // }

    // const isPasswordCorrect = await user.comparePassword(currentpassword)
    // if (!isPasswordCorrect) {
    //     throw new UnauthorizedError('Password is incorrect')
    // }

    // user.password = newpassword;

    // await user.save()
    res.status(200).json({status:'success', user:'user'})

}

module.exports = { changePassword }