import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../appconfig";
import labels from "../json/labels.json";

export const validatePrice = async (
    req : Request,
    res : Response,
    next: NextFunction
) => {
    const { price } = req.body
    
    if(price)
    {
        if(typeof(price) != 'number')
            return res.status(StatusCodes.BadRequest).json({
                message : labels.breeds.price.price_required,
                statusCode : StatusCodes.BadRequest
            })
        else
        {
            if(price < 0)
                return res.status(StatusCodes.BadRequest).json({
                    message : labels.breeds.price.negative_price,
                    statusCode : StatusCodes.BadRequest
                })
        }
    }
   
    next()
}