import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../appconfig";
import labels from "../json/labels.json";
import { getBreedbyId } from "../db/breedModel";

export const validateBreedId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try
    {
        const { id } = req.params;

        const existingBreed = await getBreedbyId(id);
    
        if (!existingBreed) {
            return res
                .status(StatusCodes.BadRequest)
                .json({
                    message: labels.breeds.generic.breed_do_not_exists,
                    statusCode: StatusCodes.BadRequest,
                });
        }
    }

    catch(error)
    {
        if (error.name === 'CastError') 
        {
            return res
                .status(StatusCodes.BadRequest)
                .json({
                    message: labels.breeds.generic.breed_do_not_exists,
                    statusCode: StatusCodes.BadRequest,
                });
        } 
        else {
            console.log(error);
            return res.sendStatus(StatusCodes.BadRequest);
        }
    }
    
    next();
};
