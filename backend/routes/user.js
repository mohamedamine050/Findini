
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/authenticate");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", auth, userController.profile);

module.exports = router;
