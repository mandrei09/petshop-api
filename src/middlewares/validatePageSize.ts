import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../appconfig";
import labels from "../json/labels.json";

export const validatePageSize = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { pageSize } = req.query;

  if (pageSize)
  {
    const pageSizeInt = parseInt(pageSize.toString())
    if(pageSizeInt < 1 || Number.isNaN(pageSizeInt))
    return res.status(StatusCodes.BadRequest).json({
      message: labels.filters.invalid_pageSize,
      statusCode: StatusCodes.BadRequest,
    });
  }
  next();
};
