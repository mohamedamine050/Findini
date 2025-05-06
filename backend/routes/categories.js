const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const auth = require("../middleware/authenticate");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

router.get("/", categoryController.getAllCategories);
router.post("/", auth, upload.fields([{ name: "image" }]), categoryController.addCategory);
router.delete("/:id", auth, categoryController.deleteCategory);

module.exports = router;

