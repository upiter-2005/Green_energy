const { Router } = require("express");
const {
  nameUpdate,
  avatarUpdate,
  getUplinerInfo,
  contactUpdate,
  passwordUpdate,
  getStructureUsers,
  getAllUsers,
  getUserByLogin,
  updateBalance,
  updateCashbackBalance,
  updateCashbackReinvest,
  updateReinvestBalance,
  updateTotalAwards,
  updateRefAwards,
  activeOn,
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

// /api/user/getStrucuture
router.get("/getStrucuture", checkAuth, getStructureUsers);

// /api/user/getStrucuture
router.get("/getAllUsers", checkAuth, getAllUsers);

// /api/user/getUserByLogin
router.post("/getUserByLogin", getUserByLogin);

// /api/user/updateBalance
router.patch("/updateBalance", updateBalance);

// /api/user/updateCashbackBalance
router.patch("/updateCashbackBalance", updateCashbackBalance);

// /api/user/updateCashbackReinvest
router.patch("/updateCashbackReinvest", updateCashbackReinvest);

// /api/user/updateReinvestBalance
router.patch("/updateReinvestBalance", updateReinvestBalance);

// /api/user/updateReinvestBalance
router.patch("/updateTotalAwards", updateTotalAwards);

// /api/user/updateReinvestBalance
router.patch("/updateRefAwards", updateRefAwards);

// /api/user/activeOn
router.patch("/activeOn", checkAuth, activeOn);

module.exports = router;
