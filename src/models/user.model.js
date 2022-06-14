import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'
const userModel = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: [{
            ref: "Role",
            type: Schema.Types.ObjectId
        }],
    },
}, {
    timestamps: true,
    versionKey: false
});

userModel.statics.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    return  bcrypt.hash(password, salt);
}
userModel.statics.comparePassword = async (password, receivedPassword) => {
//
    return bcrypt.compare(password, receivedPassword);
}


export default model('User', userModel)