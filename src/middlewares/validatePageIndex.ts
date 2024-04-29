import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../appconfig";
import labels from "../json/labels.json";

export const validatePageIndex = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { pageIndex } = req.query;

  if (pageIndex)
  {
    const pageIndexInt = parseInt(pageIndex.toString())
    if(pageIndexInt < 1 || Number.isNaN(pageIndexInt))
    return res.status(StatusCodes.BadRequest).json({
      message: labels.filters.invalid_pageIndex,
      statusCode: StatusCodes.BadRequest,
    });
  }
  next();
};
