const { Router } = require("express");
const {
  nameUpdate,
  avatarUpdate,
  getUplinerInfo,
  contactUpdate,
  passwordUpdate,
} = require("../controllers/user.js");
const checkAuth = require("../utils/checkAuth.js");

const router = Router();

router.patch("/nameUpdate", checkAuth, nameUpdate);

router.patch("/avatarUpdate", checkAuth, avatarUpdate);

// /api/user/contactUpdate
router.patch("/contactUpdate", checkAuth, contactUpdate);
// /api/user/passwordUpdate
router.patch("/passwordUpdate", checkAuth, passwordUpdate);

router.get("/getUplinerInfo", checkAuth, getUplinerInfo);

module.exports = router;
