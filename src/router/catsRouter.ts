import express from 'express'
import { isAuthenticated } from '../middlewares'
import { Routes } from '../appconfig'
import { validateNameRequired } from '../middlewares/validateNameRequired'
import { addCat, deleteCat, getAllCats, updateCat } from '../controllers/catsController'
import { validateBreedRequired } from '../middlewares/validateBreedRequired'
import { validateBreedIdBody } from '../middlewares/validateBreedId'
import { validateCatIdParams } from '../middlewares/validateCatId'
import { validateBirthDate } from '../middlewares/validateBirthDate'
import { validateSortDirection } from '../middlewares/validateSortDirection'
import { validatePageSize } from '../middlewares/validatePageSize'
import { validatePageIndex } from '../middlewares/validatePageIndex'
import { validateVaccineIdBody } from '../middlewares/validateVaccineId'


export default (router: express.Router) => {
    router.get(Routes.CATS, 
        validateSortDirection,
        validatePageSize,
        validatePageIndex, 
        getAllCats)
    router.post(Routes.CATS + Routes.CREATE, 
        isAuthenticated, 
        validateNameRequired,
        validateBreedRequired,
        validateBreedIdBody,
        validateVaccineIdBody,
        validateBirthDate,
        addCat)
    router.delete(Routes.CATS + Routes.DELETE, 
        isAuthenticated, 
        validateCatIdParams, 
        deleteCat)
    router.patch(Routes.CATS + Routes.UPDATE, 
        isAuthenticated, 
        validateCatIdParams, 
        validateBreedIdBody,
        validateVaccineIdBody,
        validateBirthDate,
        updateCat)
}
