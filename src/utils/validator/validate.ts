import { ContextRunner, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export default (validations: ContextRunner[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.array().length) break;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        code: 422,
        status: false,
        message: "Unprocessable Content",
        errors: errors.array(),
      });
    }
    next();
  };
};
