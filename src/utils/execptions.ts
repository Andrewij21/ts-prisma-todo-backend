import {
  ExceptionOptions,
  HttpCode,
  ErrorCode,
} from "../interface/execptions_interface";

export default class Exception extends Error {
  code: number;
  status: boolean;
  detail: string;

  constructor({ code, status, message, detail }: ExceptionOptions) {
    super(message);
    this.code = code;
    this.status = status;
    this.detail = detail;
  }
}

export const HTTP_CODE: HttpCode = {
  success: {
    code: 200,
    status: true,
    message: "Success",
    detail: "",
  },
  created: {
    code: 201,
    status: true,
    message: "Resource created succesfully",
    detail: "",
  },
  no_content: {
    code: 204,
    status: true,
    message: "No Content",
    detail: "",
  },
  bad_request: {
    code: 400,
    status: false,
    message: "Bad request. Please check your request data",
    detail: "",
  },
  unauthorized: {
    code: 401,
    status: false,
    message:
      "user or password does not match, or you are not authorized to accessing this page",
    detail: "",
  },
  forbidden: {
    code: 403,
    status: false,
    message: "Invalid token",
    detail: "",
  },
  not_found: {
    code: 404,
    status: false,
    message: "Resource not found",
    detail: "",
  },
  unprocessable_entity: {
    code: 422,
    status: false,
    message: "The request you sent is unable to process",
    detail: "",
  },
  conflict: {
    code: 409,
    status: false,
    message: "Data already exist",
    detail: "",
  },
  server_error: {
    code: 500,
    status: false,
    message: "An unexpected error occurred. Please try again later",
    detail: "",
  },
};

export const Error_Code: ErrorCode = {
  P2000: { ...HTTP_CODE.unprocessable_entity },
  P2001: { ...HTTP_CODE.not_found },
  P2002: { ...HTTP_CODE.conflict, detail: "Unique constraint failed" },
  P2003: { ...HTTP_CODE.not_found, detail: "Foreign key constraint not found" },
  P2025: {
    ...HTTP_CODE.not_found,
    detail: "An operation failed because records not found.",
  },
};
