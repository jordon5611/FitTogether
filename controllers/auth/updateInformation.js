//Edit Bio, fname, lname, email

const { NotFoundError } = require("../../errors")
const User = require("../../models/User")


const updateInformation = async(req,res)=>{

    const id = req.user.userId;

    const user = await User.findById(id)

    if (!user){
        throw new NotFoundError('User not Found!')
    }

    const fieldsToUpdate = ['fname', 'lname', 'email', 'bio', 'preferences', 'goals', 'healthStatus', 'fitnessLevel'];
    fieldsToUpdate.forEach(field => {
        if (req.body[field]) {
            user[field] = req.body[field];
        }
    });

    await user.save()

    res.send({status:'success', user})
}


module.exports = {updateInformation}
