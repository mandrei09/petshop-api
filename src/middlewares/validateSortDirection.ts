import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../appconfig";
import labels from "../json/labels.json";

export const validateSortDirection = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { sortDirection } = req.query;

  if (sortDirection)
    if(sortDirection != 'asc' && sortDirection != 'desc' )
    return res.status(StatusCodes.BadRequest).json({
      message: labels.filters.invalid_sortDirection,
      statusCode: StatusCodes.BadRequest,
    });
  next();
};
