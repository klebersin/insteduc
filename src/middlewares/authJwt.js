import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/user.model'
import Role from '../models/role.model'


export const verifyToken = async (req, res, next) => {
    try{
        const token = req.headers["x-access-token"];

        if(!token) return res.status(403).json({message: "No token provided"})

        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.id;
        const user = await User.findById(req.userId, {password: 0});

        if(!user) return res.status(404).json({message: "user not found"});

        next();
    }catch (error){
        return res.status(401).json({ message: "Unauthorized"})
    }
}

export const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({_id: { $in: user.role }})

    if(roles.find( myRole => myRole.name === 'moderator')){
        next();
        return;
    }
    res.status(403).json({message: "Require moderator role"})
}
export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({_id: { $in: user.role }})

    if(roles.find( myRole => myRole.name === 'admin')){
        next();
        return;
    }
    res.status(403).json({message: "Require admin role"})
}