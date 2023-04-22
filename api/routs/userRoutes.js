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
  transferBalance,
  updateBalanceAdmin,
  balanceMinus,
  pocketPlus,
  tokenPlus,
  balanceReinvestZero,
} = require("../controllers/user.js");
const checkAuth = require("../utils/checkAuth.js");

const router = Router();

router.patch("/balanceMinus", checkAuth, balanceMinus);

router.patch("/tokenPlus", checkAuth, tokenPlus);

router.patch("/pocketPlus", checkAuth, pocketPlus);

router.patch("/balanceReinvestZero", checkAuth, balanceReinvestZero);

router.patch("/transferBalance", checkAuth, transferBalance);

router.patch("/nameUpdate", checkAuth, nameUpdate);

router.patch("/updateBalanceAdmin", checkAuth, updateBalanceAdmin);

router.patch("/avatarUpdate", checkAuth, avatarUpdate);

// /api/user/contactUpdate
router.patch("/contactUpdate", checkAuth, contactUpdate);

// /api/user/passwordUpdate
router.patch("/passwordUpdate", checkAuth, passwordUpdate);

router.get("/getUplinerInfo", checkAuth, getUplinerInfo);

// /api/user/getStrucuture
router.get("/getStrucuture", checkAuth, getStructureUsers);

// /api/user/getStrucuture
router.get("/getAllUsers", getAllUsers);

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
