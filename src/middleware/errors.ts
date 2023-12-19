import { Response, NextFunction } from "express";
import Exception, { Error_Code } from "../utils/execptions";
import { Prisma } from "@prisma/client";
import { CustomRequest } from "../interface/express_interface";

export default function errorMiddleware(
  error: Exception,
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  // console.log(error);
  const ErrorMessage = req.error || "Somethings Wrong";

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.log(error);
    const errors = Error_Code[error.code];
    return res.status(errors.code).json({ ...errors, detail: ErrorMessage });
  } else {
    res.status(error.code || 500).json({
      code: error.code,
      status: error.status,
      message: error.message,
      detail: error.detail,
    });
  }
}
