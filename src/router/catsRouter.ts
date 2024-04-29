import express from 'express'
import { isAuthenticated } from '../middlewares'
import { Routes } from '../appconfig'
import { validateNameRequired } from '../middlewares/validateNameRequired'
import { addCat, deleteCat, getAllCats, updateCat } from '../controllers/catsController'
import { validateBreedRequired } from '../middlewares/validateBreedRequired'
import { validateBreedIdBody } from '../middlewares/validateBreedIdBody'
import { validateCatId } from '../middlewares/validateCatId'
import { validateBirthDate } from '../middlewares/validateBirthDate'


export default (router: express.Router) => {
    router.get(Routes.CATS, 
        isAuthenticated, 
        getAllCats)
    router.post(Routes.CATS + Routes.CREATE, 
        isAuthenticated, 
        validateNameRequired,
        validateBreedRequired,
        validateBreedIdBody,
        validateBirthDate,
        addCat)
    router.delete(Routes.CATS + Routes.DELETE, 
        isAuthenticated, 
        validateCatId, 
        deleteCat)
    router.patch(Routes.CATS + Routes.UPDATE, 
        isAuthenticated, 
        validateCatId, 
        validateBreedIdBody,
        validateBirthDate,
        updateCat)
}
