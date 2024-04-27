import express from 'express'
import { isAuthenticated } from '../middlewares'
import { addBreed, deleteBreed, getAllBreeds, updateBreed } from '../controllers/breedsController'
import { Routes } from '../appconfig'
import { validateNameRequired } from '../middlewares/validateNameRequired'
import { validateName } from '../middlewares/validateName'
import { validateBreedId } from '../middlewares/validateBreedId'
import { validatePriceRequired } from '../middlewares/validatePriceRequired'
import { validatePrice } from '../middlewares/validatePrice'

export default (router: express.Router) => {
    router.get(Routes.BREEDS, 
        isAuthenticated, 
        getAllBreeds)
    router.post(Routes.BREEDS + Routes.CREATE, 
        isAuthenticated, 
        validateNameRequired, 
        validateName, 
        validatePriceRequired, 
        validatePrice, 
        addBreed)
    router.delete(Routes.BREEDS + Routes.DELETE, 
        isAuthenticated, 
        validateBreedId, 
        deleteBreed)
    router.patch(Routes.BREEDS + Routes.UPDATE, 
        isAuthenticated, 
        validateBreedId, 
        validateName, 
        validatePrice, 
        updateBreed)
}
