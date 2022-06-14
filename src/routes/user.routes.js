// noinspection JSCheckFunctionSignatures

import { Router } from "express";
import * as useCtrl from "../controllers/user.controller"
import { authJwt, verifySignup } from "../middlewares"

const userRoutes = Router();

userRoutes.post(
    '/',
    [authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRolesExisted ],
    useCtrl.createUser);

export default userRoutes;