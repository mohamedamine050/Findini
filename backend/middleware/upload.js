const multer = require('multer');
const path = require('path');

// Pour les catégories
const categoryStorage = multer.diskStorage({
  destination: "../my-app/public",
  filename: (req, file, cb) => cb(null, file.originalname)
});

// Pour les projets
const projectStorage = multer.diskStorage({
  destination: "../my-app/public",
  filename: (req, file, cb) => cb(null, file.originalname)
});

const uploadCategory = multer({ storage: categoryStorage });
const uploadProject = multer({ storage: projectStorage });

module.exports = { uploadCategory, uploadProject };

