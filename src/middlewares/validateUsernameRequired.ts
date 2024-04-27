import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../appconfig";
import labels from "../json/labels.json";
import { getUserByUsername } from "../db/userModel";

export const validateUsernameRequired = async (
    req : Request,
    res : Response,
    next: NextFunction
) => {
    const { username } = req.body
    
    if(!username)
        return res.status(StatusCodes.BadRequest).json({
            message : labels.users.username.username_required,
            statusCode : StatusCodes.BadRequest
    })
    next()
}