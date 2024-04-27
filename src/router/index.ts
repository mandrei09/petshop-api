import express from 'express'
import authentication from './authenticationRouter'
import users from './usersRouter'
import breeds from './breedsRouter'

const router = express.Router()

export default(): express.Router => {
    authentication(router)
    users(router)
    breeds(router)
    return router
}