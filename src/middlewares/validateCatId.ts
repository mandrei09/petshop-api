import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../appconfig";
import labels from "../json/labels.json";
import { getCatbyId } from "../db/catModel";

export const validateCatId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try
    {
        const { id } = req.params;

        const existingCat = await getCatbyId(id);
    
        if (!existingCat) {
            return res
                .status(StatusCodes.BadRequest)
                .json({
                    message: labels.cats.generic.cat_do_not_exists,
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
