import express from 'express'
import { deleteUser, getAllUsers, updateUser } from "../controllers/usersController";
import { isAuthenticated, isOwner } from '../middlewares';
import { validateUserId } from '../middlewares/validateUserId'
import { validatePassword } from '../middlewares/validatePassword';
import { validateUsername } from '../middlewares/validateUsername';
import { Routes } from '../appconfig';

export default (router: express.Router) => {
    router.get(Routes.USERS, 
        isAuthenticated, 
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
}