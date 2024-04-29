import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../appconfig";
import labels from "../json/labels.json";

export const validateExpiringInMonths = async (
    req : Request,
    res : Response,
    next: NextFunction
) => {
    const { expiringInMonths } = req.body
    
    if(expiringInMonths)
    {
        if(typeof(expiringInMonths) != 'number')
            return res.status(StatusCodes.BadRequest).json({
                message : labels.vaccines.expiringInMonths.expring_required,
                statusCode : StatusCodes.BadRequest
            })
        else
        {
            if(expiringInMonths < 0)
                return res.status(StatusCodes.BadRequest).json({
                    message : labels.vaccines.expiringInMonths.negative_expiring,
                    statusCode : StatusCodes.BadRequest
                })
        }
    }
   
    next()
}