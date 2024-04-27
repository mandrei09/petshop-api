import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../appconfig";
import labels from "../json/labels.json";
import { getUserByEmail } from "../db/userModel";

export const validateEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email)
        return res.status(StatusCodes.BadRequest).json({
            message: labels.users.email.email_required,
            statusCode: StatusCodes.BadRequest,
        });
    else if (!emailRegex.test(email)) {
        return res
            .status(StatusCodes.BadRequest)
            .json({ message: labels.users.email.invalid_email_format });

    }

    next();
};
