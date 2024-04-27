import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import { Appconfig } from './appconfig'
import router from './router'

const app = express()

app.use(cors({
    credentials : true
}))
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(Appconfig.SERVER_PORT, () => {
    console.log('Server is running on http://localhost:8080/')
}) 

mongoose.Promise = Promise

mongoose.connect(Appconfig.MONGO_URL)

mongoose.connection.on('error', (error : Error) => console.log(error));

app.use('/',router())