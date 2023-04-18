const { Router } = require("express");
const { recoverPassword } = require("../controllers/email.js");
const checkAuth = require("../utils/checkAuth.js");

const router = Router();
// /api/options/getTree
router.post("/recoverPassword", checkAuth, recoverPassword);

module.exports = router;
