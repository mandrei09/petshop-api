import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../appconfig";
import labels from "../json/labels.json";
import { getByName } from "../db/breedModel";

export const validateName = async (
    req : Request,
    res : Response,
    next: NextFunction
) => {
    const { name } = req.body
    
    if(name)
    {
        const existingBreed = await getByName(name)

        if(existingBreed)
        {
            return res.status(StatusCodes.BadRequest).json({
                message : labels.breeds.name.name_already_exists,
                statusCode : StatusCodes.BadRequest
            })
        }
    }
    next()
}