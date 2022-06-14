import { Schema, model } from "mongoose";
export const ROLES = ["user", "admin", "moderator"];
const roleModel = new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    versionKey: false
})

export default model("Role", roleModel)