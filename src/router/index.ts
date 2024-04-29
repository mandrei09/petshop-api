import express from 'express'
import authentication from './authenticationRouter'
import users from './usersRouter'
import breeds from './breedsRouter'
import cats from './catsRouter'


const router = express.Router()

export default(): express.Router => {
    authentication(router)
    users(router)
    breeds(router)
    cats(router)
    return router
}