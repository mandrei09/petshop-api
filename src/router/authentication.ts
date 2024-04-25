import express from 'express'
import { login, register } from '../controllers/authentication'
import { validateEmail } from '../middlewares/validateEmail'
import { validatePassword } from '../middlewares/validatePassword'
import { validateUsername } from '../middlewares/validateUsername'
import { validateEmailRegister } from '../middlewares/validateEmailRegister'
import { validateEmailLogin } from '../middlewares/validateEmailLogin'

export default (router: express.Router) => {
    router.post('/auth/register', 
        validateEmail,
        validateEmailRegister, 
        validatePassword, 
        validateUsername, 
        register)
    router.post('/login', 
        validateEmail,
        validateEmailLogin, 
        validatePassword, 
        login)
}