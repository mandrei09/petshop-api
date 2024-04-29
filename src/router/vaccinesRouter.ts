import express from 'express'
import { isAuthenticated } from '../middlewares'
import { Routes } from '../appconfig'
import { validateNameRequired } from '../middlewares/validateNameRequired'
import { validateName } from '../middlewares/validateName'
import { validateVaccineIdParams } from '../middlewares/validateVaccineId'
import { validatePriceRequired } from '../middlewares/validatePriceRequired'
import { validatePrice } from '../middlewares/validatePrice'
import { validateSortDirection } from '../middlewares/validateSortDirection'
import { validatePageSize } from '../middlewares/validatePageSize'
import { validatePageIndex } from '../middlewares/validatePageIndex'
import { addVaccine, deleteVaccine, getAllVaccines, updateVaccine } from '../controllers/vaccinesController'
import { validateExpiringInMonthsRequired } from '../middlewares/validateExpiringInMonthsRequired'
import { validateExpiringInMonths } from '../middlewares/validateExpiringInMonths'

export default (router: express.Router) => {
    router.get(Routes.VACCINES, 
        validateSortDirection,
        validatePageSize,
        validatePageIndex,
        getAllVaccines)
    router.post(Routes.VACCINES + Routes.CREATE, 
        isAuthenticated, 
        validateNameRequired, 
        validateName, 
        validatePriceRequired, 
        validatePrice,
        validateExpiringInMonthsRequired,
        validateExpiringInMonths,
        addVaccine)
    router.delete(Routes.VACCINES + Routes.DELETE, 
        isAuthenticated, 
        validateVaccineIdParams, 
        deleteVaccine)
    router.patch(Routes.VACCINES + Routes.UPDATE, 
        isAuthenticated, 
        validateVaccineIdParams, 
        validateName, 
        validatePrice,
        validateExpiringInMonths,
        updateVaccine)
}
