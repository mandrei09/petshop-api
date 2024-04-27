import express, { application } from 'express'
import {get,identity,merge} from 'lodash'
import { getUserBySessionToken } from '../db/userModel'
import { Appconfig, StatusCodes } from '../appconfig'
import labels from "../json/labels.json";

export const isOwner = async (req: express.Request, res: express.Response, next : express.NextFunction) => 
{
    try
    {
        const { id } = req.params
        let currentUserId = get(req, 'identity._id') as unknown as string
        currentUserId = currentUserId.toString()

        if(currentUserId != id)
        {
            return res
                .status(StatusCodes.BadRequest)
                .json({
                    message: labels.users.sessionToken.not_account_owner,
                    statusCode: StatusCodes.BadRequest,
                });
        }
        next()
    }
    catch(error)
    {
        console.log(error)
        return res.sendStatus(StatusCodes.BadRequest)
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next : express.NextFunction) => 
{
    try
    {
        const sessionToken = req.cookies[Appconfig.TOKEN_KEY]
        const existingUser = await getUserBySessionToken(sessionToken)
        if (!existingUser) {
            return res
                .status(StatusCodes.BadRequest)
                .json({
                    message: labels.users.sessionToken.no_logged_user,
                    statusCode: StatusCodes.BadRequest,
                });
        }
    
        merge(req, {identity : existingUser})
        return next()
    }
    catch(error)
    {
        console.log(error)
        return res.sendStatus(StatusCodes.BadRequest)
    }
}