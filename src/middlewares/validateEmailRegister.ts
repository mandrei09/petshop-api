import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../appconfig";
import labels from "../json/labels.json";
import { getUserByEmail } from "../db/users";

export const validateEmailRegister = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email } = req.body;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return res
            .status(StatusCodes.BadRequest)
            .json({
                message: labels.users.generic.user_already_exists_label,
                statusCode: StatusCodes.BadRequest,
            });
    }
    next();
};
