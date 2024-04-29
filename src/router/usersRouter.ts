import express from 'express'
import { addCatToUser, deleteUser, getAllUsers, updateUser } from "../controllers/usersController";
import { isAuthenticated, isOwner } from '../middlewares';
import { validateUserId } from '../middlewares/validateUserId'
import { validatePassword } from '../middlewares/validatePassword';
import { validateUsername } from '../middlewares/validateUsername';
import { Routes } from '../appconfig';
import { validateCatIdBody } from '../middlewares/validateCatId';
import { validateSortDirection } from '../middlewares/validateSortDirection';
import { validatePageIndex } from '../middlewares/validatePageIndex';
import { validatePageSize } from '../middlewares/validatePageSize';

export default (router: express.Router) => {
    router.get(Routes.USERS, 
        validateSortDirection,
        validatePageSize,
        validatePageIndex, 
        getAllUsers)
    router.delete(Routes.USERS + Routes.DELETE, 
        isAuthenticated, 
        validateUserId, 
        isOwner, 
        deleteUser)
    router.patch(Routes.USERS + Routes.UPDATE, 
        isAuthenticated, 
        validateUserId, 
        isOwner, 
        validatePassword,
        validateUsername, 
        updateUser)
    router.patch(Routes.USERS + Routes.ADD_CAT,
        isAuthenticated, 
        validateUserId,
        isOwner,
        validateCatIdBody,
        addCatToUser
    )
}