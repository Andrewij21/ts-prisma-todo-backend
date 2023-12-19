export interface ErrorCode {
  [key: string]: {
    detail: string;
    status: boolean;
    code: number;
    message: string;
  };
}

interface HttpCodeEntry {
  detail: string;
  status: boolean;
  code: number;
  message: string;
}

export interface HttpCode {
  success: HttpCodeEntry;
  created: HttpCodeEntry;
  no_content: HttpCodeEntry;
  bad_request: HttpCodeEntry;
  unauthorized: HttpCodeEntry;
  forbidden: HttpCodeEntry;
  not_found: HttpCodeEntry;
  unprocessable_entity: HttpCodeEntry;
  conflict: HttpCodeEntry;
  server_error: HttpCodeEntry;
}

export interface ExceptionOptions {
  code: number;
  status: boolean;
  message: string;
  detail: string;
}
