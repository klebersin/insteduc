// noinspection JSCheckFunctionSignatures

import { Router } from "express";
import * as authCtrl from '../controllers/auth.controller'
import  { verifySignup } from "../middlewares"

const authRoutes = Router()

authRoutes.post(
    '/signup',
    [verifySignup.checkDuplicatedUsernameOrEmail, verifySignup.checkRolesExisted],
    authCtrl.signUp)
authRoutes.post('/signin', authCtrl.signIn)

export default authRoutes;