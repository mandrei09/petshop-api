import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../appconfig";
import labels from "../json/labels.json";

export const validateSessionToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { sessionToken } = req.body;

  if (!sessionToken)
    return res.status(StatusCodes.BadRequest).json({
      message: labels.users.sessionToken.no_session_token,
      statusCode: StatusCodes.BadRequest,
    });
  next();
};
