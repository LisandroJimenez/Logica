import { Router } from "express";
import { createUser, getResults, getTotals, getTotalUser,getMayor } from "./usuario.controller.js";

const router = Router()

router.post(
    '/register',
    createUser
)

router.get(
    '/user',
    getResults
)

router.get(
    '/totalMonto',
    getTotals
)

router.get(
    '/:id',
    getTotalUser
)

router.get(
    '/',
    getMayor
)
export default router