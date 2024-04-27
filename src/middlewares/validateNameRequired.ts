import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../appconfig";
import labels from "../json/labels.json";
import { getUserByUsername } from "../db/userModel";

export const validateNameRequired = async (
    req : Request,
    res : Response,
    next: NextFunction
) => {
    const { name } = req.body
    
    if(!name)
        return res.status(StatusCodes.BadRequest).json({
            message : labels.breeds.name.name_required,
            statusCode : StatusCodes.BadRequest
    })
    next()
}