const uuid = require("uuid");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

const uniqueId = uuid.v4();
const DUMMER_USERS = [
  {
    id: 1,
    name: "kelvin",
    email: "test@test.com",
    password: "testers",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMER_USERS });
};
const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs passed, please check your data", 422);
  }
  const { name, email, password } = req.body;
  const hasUser = DUMMER_USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError("Could not create user, email already exists", 422);
  }
  const createdUser = {
    id: uniqueId,
    name,
    email,
    password,
  };
  DUMMER_USERS.push(createdUser);
  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identfiedUser = DUMMER_USERS.find((u) => u.email === email);
  if (!identfiedUser || identfiedUser.password !== password) {
    throw new HttpError(
      "could not identify user, credentials seems to be wrong",
      401
    );
  }
  res.json({ message: "Logged In" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
