import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../appconfig";
import labels from "../json/labels.json";
import { getUserByEmail } from "../db/userModel";

export const validateEmailLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email } = req.body;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return res
            .status(StatusCodes.BadRequest)
            .json({
                message: labels.users.generic.user_do_not_exists,
                statusCode: StatusCodes.BadRequest,
            });
    }
    next();
};
