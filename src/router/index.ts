import express from 'express'
import authentication from './authenticationRouter'
import users from './usersRouter'
import breeds from './breedsRouter'
import cats from './catsRouter'
import vaccines from './vaccinesRouter'

const router = express.Router()

export default(): express.Router => {
    authentication(router)
    users(router)
    breeds(router)
    cats(router)
    vaccines(router)
    return router
}