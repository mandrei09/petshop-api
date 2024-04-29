import express from 'express'
import { StatusCodes } from '../appconfig'
import labels from "../json/labels.json";
import { createVaccine, deleteVaccineById, getVaccineById, getVaccines } from '../db/vaccineModel';

export const getAllVaccines = async (req: express.Request, res: express.Response) => {
    try {
        const breeds = await getVaccines(req.query)

        return res.status(StatusCodes.Succes).json(breeds)
    }
    catch (error) {
        console.log(error)
        return res.sendStatus(StatusCodes.BadRequest)
    }
}

export const addVaccine = async (req: express.Request, res: express.Response) => {
    try {
      const { name, price, expiringInMonths } = req.body;
      
      const vaccine = await createVaccine({name,price,expiringInMonths});
  
      return res
        .status(StatusCodes.Succes)
        .json({
          message: labels.vaccines.generic.vaccine_created_succesfuly,
          statusCode: StatusCodes.Succes,
          vaccine: vaccine,
        });
  
    } 
    catch (error) {
      console.log(error);
      return res.sendStatus(StatusCodes.BadRequest);
    }
  };

export const deleteVaccine = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const deletedVaccine = await deleteVaccineById(id)
        return res.status(StatusCodes.Succes).json({
            message: labels.vaccines.generic.vaccine_deleted_succesfuly,
            statusCode: StatusCodes.Succes,
            vaccine: deletedVaccine
        });
    }
    catch (error) {
        console.log(error)
        return res.sendStatus(StatusCodes.BadRequest)
    }
}

export const updateVaccine = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const { name, price, expiringInMonths } = req.body

        const vaccine = await getVaccineById(id)

        if(name)
        {
            vaccine!.name = name
        }

        if(price)
        {
            vaccine!.price = price
        }

        if(price)
        {
            vaccine!.expiringInMonths = expiringInMonths
        }
       
        await vaccine!.save()

        return res.status(StatusCodes.Succes).json({
            message: labels.vaccines.generic.vaccine_updated_succesfuly,
            statusCode: StatusCodes.Succes,
            breed: vaccine
        });
    }
    catch (error) {
        console.log(error)
        return res.sendStatus(StatusCodes.BadRequest)
    }
}