import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request-error";

const extractUserFromHeaders = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userHeader = req.headers["x-user"];
  if (userHeader && typeof userHeader === "string") {
    try {
      req["user"] = JSON.parse(decodeURIComponent(userHeader));
    } catch (err) {
      throw new BadRequestError("something went wrong");
    }
  }
  next();
};

export default extractUserFromHeaders;
