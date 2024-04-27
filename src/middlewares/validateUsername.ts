import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../appconfig";
import labels from "../json/labels.json";
import { getUserByUsername } from "../db/userModel";

export const validateUsername = async (
    req : Request,
    res : Response,
    next: NextFunction
) => {
    const { username } = req.body
    
    if(username)
    {
        const existingUser = await getUserByUsername(username)

        if(existingUser)
        {
            return res.status(StatusCodes.BadRequest).json({
                message : labels.users.username.username_already_exists,
                statusCode : StatusCodes.BadRequest
            })
        }
    }
    next()
}