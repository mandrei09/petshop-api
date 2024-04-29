import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../appconfig";
import labels from "../json/labels.json";

export const validateBirthDate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { birthDate } = req.body;

    if(birthDate)
    {
        const currentDate = new Date();
        const providedDate = new Date(birthDate);
        if (providedDate > currentDate) {
            return res.status(StatusCodes.BadRequest).json({
                message: labels.cats.birthDate.invalid_date_format,
                statusCode: StatusCodes.BadRequest
            });
        }
    }
    
    next();
};
