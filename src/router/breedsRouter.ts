import express from 'express'
import { isAuthenticated } from '../middlewares'
import { addBreed, deleteBreed, getAllBreeds, updateBreed } from '../controllers/breedsController'
import { Routes } from '../appconfig'
import { validateNameRequired } from '../middlewares/validateNameRequired'
import { validateName } from '../middlewares/validateName'
import { validateBreedIdParams } from '../middlewares/validateBreedIdParams'
import { validatePriceRequired } from '../middlewares/validatePriceRequired'
import { validatePrice } from '../middlewares/validatePrice'
import { validateSortDirection } from '../middlewares/validateSortDirection'
import { validatePageSize } from '../middlewares/validatePageSize'
import { validatePageIndex } from '../middlewares/validatePageIndex'

export default (router: express.Router) => {
    router.get(Routes.BREEDS, 
        isAuthenticated,
        validateSortDirection,
        validatePageSize,
        validatePageIndex,
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
        validateBreedIdParams, 
        deleteBreed)
    router.patch(Routes.BREEDS + Routes.UPDATE, 
        isAuthenticated, 
        validateBreedIdParams, 
        validateName, 
        validatePrice, 
        updateBreed)
}
