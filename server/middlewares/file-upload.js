const multer = require("multer");
const { v1: uuidv1 } = require("uuid");
const path = require("path");
const uniqueID = uuidv1();
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const uploadFile = (req, res, next) => {
  let imagePath;
  const fileUpload = multer({
    limits: 500000,
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "uploads/images");
      },
      filename: (req, file, cb) => {
        imagePath = MIME_TYPE_MAP[file.mimetype];
        cb(null, uniqueID + "." + imagePath);
      },
    }),
    fileFilter: (req, file, cb) => {
      const isValid = !!MIME_TYPE_MAP[file.mimetype];
      let error = isValid ? null : new Error("Invalid mime type!");
      cb(error, isValid);
    },
  });
  const baseUrl = "http://localhost:5000";
  const imageUrl = path.join(baseUrl, "uploads/images", imagePath);
  req.fileUrl = imageUrl;
  next();
};
module.exports = { uploadFile };
