const { Router } = require("express");
const { login, register, getMe, checkUpliner } = require("../controllers/auth.js");
const validateForm = require("../utils/auth.js");
const handeValidateErrors = require("../utils/handleValidateErrors.js");
const checkAuth = require("../utils/checkAuth.js");

const router = Router();

router.post("/register", validateForm, handeValidateErrors, register);

router.post("/login", login);

router.get("/me", checkAuth, getMe);

router.post("/checkUpliner", checkUpliner);

module.exports = router;
