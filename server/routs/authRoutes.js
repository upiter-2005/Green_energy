import { Router } from "express";
import { login, register, getMe } from "../controllers/auth.js";
import { validateForm } from "../utils/auth.js";
import { handeValidateErrors } from "../utils/handleValidateErrors.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = Router();

router.post("/register", validateForm, handeValidateErrors, register);

router.post("/login", login);

router.get("/me", checkAuth, getMe);

export default router;
