const express = require("express");
const multer = require("multer");
const router = express.Router();

//multer takes the file from frontend, and stores in the uploads folder
//it will take care of buffers and streams
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, "Rohith.xlsx");
  },
});
//we are hardcoded file name to Rohith, so everytime we upload a file, the data inside the file will be written into Rohith, so that it wont create a new file, decreases the burden to server.

const upload = multer({ storage: storage });

const uploadController = require("../Controllers/upload");

router.post("/upload", upload.single("profile"), uploadController.uploadFile);

module.exports = router;
