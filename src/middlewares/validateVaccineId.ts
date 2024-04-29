import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../appconfig";
import labels from "../json/labels.json";
import { getVaccineById } from "../db/vaccineModel";

export const validateVaccineIdBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try
    {
        const { vaccineId } = req.body;

        if(vaccineId)
        {
            const existingVaccine = await getVaccineById(vaccineId);
    
            if (!existingVaccine) {
                return res
                    .status(StatusCodes.BadRequest)
                    .json({
                        message: labels.vaccines.generic.vaccine_do_not_exists,
                        statusCode: StatusCodes.BadRequest,
                    });
            }
        }
        
    }

    catch(error)
    {
        if (error.name === 'CastError') 
        {
            return res
                .status(StatusCodes.BadRequest)
                .json({
                    message: labels.vaccines.generic.vaccine_do_not_exists,
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

export const validateVaccineIdParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try
    {
        const { id } = req.params;

        const existingVaccine = await getVaccineById(id);
    
        if (!existingVaccine) {
            return res
                .status(StatusCodes.BadRequest)
                .json({
                    message: labels.vaccines.generic.vaccine_do_not_exists,
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
                    message: labels.vaccines.generic.vaccine_do_not_exists,
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
