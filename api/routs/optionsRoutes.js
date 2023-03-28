const { Router } = require("express");
const { getTree, setTree } = require("../controllers/options.js");
const checkAuth = require("../utils/checkAuth.js");

const router = Router();
// /api/options/getTree
router.get("/getTree", checkAuth, getTree);

// /api/options/setTree
router.patch("/setTree", checkAuth, setTree);

module.exports = router;
