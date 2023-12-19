import { body, param } from "express-validator";

export const CreateRules = [
  body("title", "title cannot empty").notEmpty({ ignore_whitespace: true }),
  body("userId")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("userId cannot empty")
    .toInt()
    .isNumeric()
    .withMessage("userId must numeric"),
];

export const IdParamsRules = [param("id", "Not number").toInt().isNumeric()];

export const UpdateRules = [
  body("title", "title cannot empty")
    .optional()
    .notEmpty({ ignore_whitespace: true }),
  body("userId")
    .optional()
    .notEmpty({ ignore_whitespace: true })
    .withMessage("userId cannot empty")
    .toInt()
    .isNumeric()
    .withMessage("userId must numeric"),
];
