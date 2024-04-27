import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../appconfig";
import labels from "../json/labels.json";
import { getUserById } from "../db/userModel";

export const validateUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {
        const { id } = req.params;

        const existingUser = await getUserById(id);
    
        if (!existingUser) {
            return res
                .status(StatusCodes.BadRequest)
                .json({
                    message: labels.users.generic.user_do_not_exists,
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
                    message: labels.users.generic.user_do_not_exists,
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
