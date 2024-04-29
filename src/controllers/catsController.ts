import express from 'express'
import { StatusCodes } from '../appconfig'
import labels from "../json/labels.json";
import { createCat, deleteCatById, getCatbyId, getCats } from '../db/catModel';
import { calculateAge } from '../helpers/calculateAge'
import { getBreedbyId } from '../db/breedModel';
import { getVaccineById } from '../db/vaccineModel';
import { addMonths } from '../helpers/addMonths';

export const getAllCats = async (req: express.Request, res: express.Response) => {
  try {
    const cats = await getCats(req.query)
    return res.status(StatusCodes.Succes).json(cats)
  }
  catch (error) {
    console.log(error)
    return res.sendStatus(StatusCodes.BadRequest)
  }
}

export const addCat = async (req: express.Request, res: express.Response) => {
  try {
    const { name, breedId, birthDate, vaccineId } = req.body;

    const age = await calculateAge(new Date(birthDate))

    const breed = await getBreedbyId(breedId)

    const vaccine = await getVaccineById(vaccineId)

    vaccine!.administratedAt = new Date()
    vaccine!.expiringAt = addMonths(vaccine!.expiringInMonths)

    const cat = await createCat({ name, breed, birthDate, age, vaccine });

    return res
      .status(StatusCodes.Succes)
      .json({
        message: labels.cats.generic.cat_created_succesfuly,
        statusCode: StatusCodes.Succes,
        cat: cat,
      });
  }
  catch (error) {
    console.log(error);
    return res.sendStatus(StatusCodes.BadRequest);
  }
};

export const deleteCat = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params
    const deletedCat = await deleteCatById(id)
    return res.status(StatusCodes.Succes).json({
      message: labels.cats.generic.cat_deleted_succesfuly,
      statusCode: StatusCodes.Succes,
      cat: deletedCat
    });
  }
  catch (error) {
    console.log(error)
    return res.sendStatus(StatusCodes.BadRequest)
  }
}

export const updateCat = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params
    const { name, breedId, birthDate, vaccineId } = req.body

    const cat = await getCatbyId(id)

    if (name) {
      cat!.name = name
    }

    if (breedId) {
      const breed = await getBreedbyId(breedId)
      if (breed) {
        cat!.breed = breed
      }
    }

    if (birthDate) {
      cat!.birthDate = birthDate
      const age = await calculateAge(new Date(birthDate))
      cat!.age = age
    }

    if (vaccineId) {
      const vaccine = await getVaccineById(vaccineId)
      if (vaccine) {
        cat!.vaccine = vaccine
        vaccine!.administratedAt = new Date()
        vaccine!.expiringAt = addMonths(vaccine!.expiringInMonths)
      }
    }

    await cat!.save()

    return res.status(StatusCodes.Succes).json({
      message: labels.cats.generic.cat_updated_succesfuly,
      statusCode: StatusCodes.Succes,
      cat: cat
    });
  }
  catch (error) {
    console.log(error)
    return res.sendStatus(StatusCodes.BadRequest)
  }
}