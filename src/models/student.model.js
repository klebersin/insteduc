const { Schema, model } = require("mongoose");
const { STUDENT_STATUS_TYPES } = require("../constants/index");

const studentSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    fatherSurname: {
        type: String,
        required: true,
    },
    motherSurname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    tutor: {
        type: String,
    },
    tutorCode: {
        type: String,
    },
    monthly: {
        type: Number,
    },
    grade: {
        type: Number,
        required: true,
    },
    address: String,
    status: {
        type: String,
        default: STUDENT_STATUS_TYPES.ACTIVE,
    },
}, {
    timestamps: true,
    versionKey: false
})

export default model('Student', studentSchema);
