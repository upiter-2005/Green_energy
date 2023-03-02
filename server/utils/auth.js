import { body } from "express-validator";

export const validateForm = [
  body("email").isEmail(),
  body("password", "password less then 6 symbols").isLength({ min: 6 }),
];
