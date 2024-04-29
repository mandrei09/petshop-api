import express from 'express'
import { StatusCodes } from '../appconfig'
import labels from "../json/labels.json";
import { deleteBreedById, getBreeds, getBreedbyId, createBreed } from '../db/breedModel';

export const getAllBreeds = async (req: express.Request, res: express.Response) => {
    try {
        const breeds = await getBreeds(req.query)

        return res.status(StatusCodes.Succes).json(breeds)
    }
    catch (error) {
        console.log(error)
        return res.sendStatus(StatusCodes.BadRequest)
    }
}

export const addBreed = async (req: express.Request, res: express.Response) => {
    try {
      const { name, price } = req.body;
      
      const breed = await createBreed({name,price});
  
      return res
        .status(StatusCodes.Succes)
        .json({
          message: labels.breeds.generic.breed_created_succesfuly,
          statusCode: StatusCodes.Succes,
          user: breed,
        });
  
    } 
    catch (error) {
      console.log(error);
      return res.sendStatus(StatusCodes.BadRequest);
    }
  };

export const deleteBreed = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const deletedBreed = await deleteBreedById(id)
        return res.status(StatusCodes.Succes).json({
            message: labels.breeds.generic.breed_deleted_succesfuly,
            statusCode: StatusCodes.Succes,
            breed: deletedBreed
        });
    }
    catch (error) {
        console.log(error)
        return res.sendStatus(StatusCodes.BadRequest)
    }
}

export const updateBreed = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const { name, price } = req.body

        const breed = await getBreedbyId(id)

        if(name)
        {
            breed!.name = name
        }

        if(price)
        {
            breed!.price = price
        }
       
        await breed!.save()

        return res.status(StatusCodes.Succes).json({
            message: labels.breeds.generic.breed_updated_succesfuly,
            statusCode: StatusCodes.Succes,
            breed: breed
        });
    }
    catch (error) {
        console.log(error)
        return res.sendStatus(StatusCodes.BadRequest)
    }
}