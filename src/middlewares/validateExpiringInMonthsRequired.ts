import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../appconfig";
import labels from "../json/labels.json";

export const validateExpiringInMonthsRequired = async (
    req : Request,
    res : Response,
    next: NextFunction
) => {
    const { expiringInMonths } = req.body
    if(!expiringInMonths)
        return res.status(StatusCodes.BadRequest).json({
            message : labels.vaccines.expiringInMonths.expring_required,
            statusCode : StatusCodes.BadRequest
    })
    next()
}