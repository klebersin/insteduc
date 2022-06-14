import User from '../models/user.model'
import Role from '../models/role.model'
import jwt from 'jsonwebtoken'
import config from '../config'

export const signUp = async (req, res) => {

    const { username, email, password, role } = req.body;

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })

    if(role){
        const foundRoles = await Role.find({name: {$in: role}});
        newUser.role = foundRoles.map( valueRol => valueRol._id);
    }else{
        const roleDeafult = await Role.findOne({ name: "user"})
        newUser.role =[roleDeafult._id]
    }

    const savedUser = await newUser.save();
    console.log(savedUser)

    const token = jwt.sign(
        {id: savedUser._id},
        config.SECRET,
        {expiresIn: 86400}
    )

    res.status(200).json({token});
}
export const signIn = async (req, res) => {
    const userFound = await User.findOne(
        {
            email: req.body.email
        }).populate("role");

    if(!userFound) return res.status(400).json({message: "User not found"});

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if(!matchPassword) return res.status(401).json({token: null, message: "Invalid Password"})

    const token = jwt.sign(
        {id: userFound._id},
        config.SECRET,
        { expiresIn: 86400}
    )
    res.json({token})

}