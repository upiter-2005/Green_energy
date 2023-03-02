import { Router } from "express";
import {
  nameUpdate,
  avatarUpdate,
  getUplinerInfo,
  contactUpdate,
  passwordUpdate,
} from "../controllers/user.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = Router();

router.patch("/nameUpdate", checkAuth, nameUpdate);

router.patch("/avatarUpdate", checkAuth, avatarUpdate);

// /api/user/contactUpdate
router.patch("/contactUpdate", checkAuth, contactUpdate);
// /api/user/passwordUpdate
router.patch("/passwordUpdate", checkAuth, passwordUpdate);

router.get("/getUplinerInfo", checkAuth, getUplinerInfo);

export default router;
