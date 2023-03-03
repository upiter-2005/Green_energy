const { body } = require("express-validator");

module.exports = [
  body("email").isEmail(),
  body("password", "password less then 6 symbols").isLength({ min: 6 }),
];
