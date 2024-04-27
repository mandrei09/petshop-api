import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../appconfig";
import labels from "../json/labels.json";

export const validatePriceRequired = async (
    req : Request,
    res : Response,
    next: NextFunction
) => {
    const { price } = req.body
    if(!price)
        return res.status(StatusCodes.BadRequest).json({
            message : labels.breeds.price.price_required,
            statusCode : StatusCodes.BadRequest
    })
    next()
}