const express = require("express");
const usersControllers = require("../controllers/users-controler");
const { check } = require("express-validator");
const { uploadFile } = require("../middlewares/file-upload");
const router = express.Router();

router.get("/", usersControllers.getUsers);

router.post(
  "/signup",
  uploadFile,
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersControllers.signup
);

router.post("/login", usersControllers.login);

module.exports = router;
