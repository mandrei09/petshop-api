import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../appconfig";
import labels from "../json/labels.json";

export const validatePassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body;

  if(password)
  {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{5,}$/;

    if (!passwordRegex.test(password)) {
      return res
        .status(StatusCodes.BadRequest)
        .json({ message: labels.users.password.invalid_password_format });
    }
  }
  next();
};
