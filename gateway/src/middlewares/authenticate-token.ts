import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const err_message = {
    errors: [
      {
        message: "Unauthorized",
      },
    ],
  };

  const token = req?.cookies?.token;

  if (!token) {
    return res.status(401).send(err_message);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // setting decoded header for consumption of services..
    req.headers['x-user'] = encodeURIComponent(JSON.stringify(decoded));

    next();
  } catch (err) {
    console.log(err.message)
    return res.status(401).send(err_message);
  }
};
