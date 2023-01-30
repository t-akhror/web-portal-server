const multer = require("multer");
const path = require("path");

// store images function
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    let ext = path.extname(file.originalname);
    callback(null, Date.now() + ext);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype == "image/jpg" || file.mimetype == "image/png") {
      callback(null, true);
    } else {
      console.log("Only .jpg or .png formats supported!");
      callback(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 8,
  },
});

module.exports = upload;
