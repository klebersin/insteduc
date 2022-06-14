import Student from '../models/student.model'
import {STUDENT_STATUS_TYPES} from "../constants";
const {  default: mongoose} = require("mongoose")
export const getStudents = async (req, res) => {
    const students = await Student.find();
    res.json(students)
}
export const getStudent = async (req, res) => {
    //
    const { studentId } = req.params;
    const student = await Student.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(studentId),
            },
        },
        {
            $lookup: {
                from: "invoices",
                localField: "_id",
                foreignField: "student",
                as: "invoices",
            },
        },
    ])
    res.status(200).json(student[0])
    //return student[0];
}
export const createStudent = async (req, res) => {
    const {code, name, fatherSurname, motherSurname, email, phoneNumber, grade, address} = req.body;
    const newStudent = new Student({
        code,
        name,
        fatherSurname,
        motherSurname,
        email,
        phoneNumber,
        grade,
        address
    });
    const studentSaved = await newStudent.save();

    res.status(201).json(studentSaved)

}
export const updateStudent = async (req, res) => {
    const { studentId } = req.params;
    const studentUpdate = await Student.findByIdAndUpdate(studentId, req.body, { new: true});
    res.status(200).json(studentUpdate);
}

export const deleteStudent = async (req, res) => {
    const { studentId } = req.params;
    const studentDeleted = await Student.findByIdAndUpdate(studentId, {status: STUDENT_STATUS_TYPES.INACTIVE}, { new: true})
    res.status(200).json(studentDeleted);
}