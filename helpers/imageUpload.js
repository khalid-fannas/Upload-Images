const multer = require("multer");
const path = require("path");
const fs = require("fs");

const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

function imageFileFilter(req, file, cb) {
  const extname = allowedTypes.includes(file.mimetype);

  if (extname) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (jpg, jpeg, png, gif) are allowed!"), false);
  }
}

const uploadsDir = "./public/original";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/original");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: imageFileFilter,
});

module.exports = upload;
