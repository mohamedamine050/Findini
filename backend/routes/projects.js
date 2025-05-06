const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const auth = require("../middleware/authenticate");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

router.get("/", projectController.getProjects);
router.post("/", auth, upload.fields([{ name: "image" }]), projectController.addProject);

module.exports = router;

