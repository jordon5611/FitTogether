const User = require('../../models/User')
const { NotFoundError, UnauthorizedError } = require('../../errors')

const login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email: email })

    if (!user) {
        throw new NotFoundError('No Account created with this email!')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthorizedError('Password is incorrect!')
    }
    const token = user.createToken()

    const lastLogin = new Date()

    user.lastLogin = lastLogin

    await user.save()

    const data = {...user.toObject(),token}
    
    res.status(200).json({ status: 'success', data , message: 'Logged in successfully' })
}

module.exports = { login }


