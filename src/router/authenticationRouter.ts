import express from 'express'
import { login, register } from '../controllers/authenticationController'
import { validateEmail } from '../middlewares/validateEmail'
import { validatePassword } from '../middlewares/validatePassword'
import { validateUsername } from '../middlewares/validateUsername'
import { validateEmailRegister } from '../middlewares/validateEmailRegister'
import { validateEmailLogin } from '../middlewares/validateEmailLogin'
import { validatePasswordRequired } from '../middlewares/validatePasswordRequired'
import { validateUsernameRequired } from '../middlewares/validateUsernameRequired'
import { Routes } from '../appconfig'

export default (router: express.Router) => {
    
    router.post(Routes.REGISTER, 
        validateEmail,
        validateEmailRegister,
        validatePasswordRequired,
        validatePassword,
        validateUsernameRequired,
        validateUsername, 
        register)

    router.post(Routes.LOGIN, 
        validateEmail,
        validateEmailLogin,
        validatePasswordRequired, 
        validatePassword, 
        login)
}