import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../appconfig";
import labels from "../json/labels.json";

export const validatePasswordRequired = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body;

  if (!password)
    return res.status(StatusCodes.BadRequest).json({
      message: labels.users.password.password_required,
      statusCode: StatusCodes.BadRequest,
    });
    
  next();
};
