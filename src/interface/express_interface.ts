import { Request } from "express";

export interface CustomRequest extends Request {
  error?: string; // Add your custom property here
}
