// noinspection JSCheckFunctionSignatures

import { Router } from "express";
import * as studentCtrl from "../controllers/student.controller";
import { authJwt } from "../middlewares";

const studentsRoutes = Router();

studentsRoutes.post(
    '/',
    [authJwt.verifyToken, authJwt.isModerator],
    studentCtrl.createStudent
)
studentsRoutes.get(
    '/',
    studentCtrl.getStudents
)
studentsRoutes.get(
    '/:studentId',
    studentCtrl.getStudent
)
studentsRoutes.put(
    '/:studentId',
    authJwt.verifyToken,
    studentCtrl.updateStudent
)
studentsRoutes.delete(
    '/:studentId',
    [authJwt.verifyToken, authJwt.isAdmin],
    studentCtrl.deleteStudent
)

export default studentsRoutes;