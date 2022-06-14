import { ROLES } from "../models/role.model";
import User from "../models/user.model"
export const checkRolesExisted = async (req, res, next) => {

    const myRoles = req.body.role
    if(myRoles){
        for(let i=0; i< myRoles.length; i++){
            if (!ROLES.includes(myRoles[i])){
                return res.status(400).json({message: `Role ${myRoles[i]} does not exist`})
            }
        }
    }
    next();
}

export const checkDuplicatedUsernameOrEmail = async (req, res, next) => {
    const userFound = await User.findOne({username: req.body.username});

    if (userFound) return res.status(400).json({ message: "The user already exists"})

    const email = await User.findOne({email: req.body.email})
    if (email) return res.status(400).json({ message: "The email already exists"})

    next();

}