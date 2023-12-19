import { body, param } from "express-validator";

export const CreateRules = [
  body("name", "name cannot empty").notEmpty({ ignore_whitespace: true }),
  body("email").isEmail().withMessage("Email invalid"),
];

export const IdParamsRules = [param("id", "Not number").toInt().isNumeric()];

export const UpdateRules = [
  body("name", "name cannot empty")
    .optional()
    .notEmpty({ ignore_whitespace: true }),
  body("email").optional().isEmail().withMessage("Email invalid"),
];
