import express from 'express'
import { deleteUserById, getUserById, getUserByUsername, getUsers } from '../db/userModel'
import { StatusCodes } from '../appconfig'
import labels from "../json/labels.json";
import { authentication, random } from '../helpers';
import { getCatbyId } from '../db/catModel';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers(req.query)
        return res.status(StatusCodes.Succes).json(users)
    }
    catch (error) {
        console.log(error)
        return res.sendStatus(StatusCodes.BadRequest)
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const deletedUser = await deleteUserById(id)
        return res.status(StatusCodes.Succes).json({
            message: labels.users.generic.user_deleted_succesfuly,
            statusCode: StatusCodes.Succes,
            user: deletedUser
        });
    }
    catch (error) {
        console.log(error)
        return res.sendStatus(StatusCodes.BadRequest)
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const { username, firstName, lastName, password } = req.body

        const user = await getUserById(id)

        if(username)
        {
            user!.username = username
        }

        if(firstName)
            user!.firstName = firstName
        
        if(lastName)
            user!.lastName = lastName

        if(password)
        {
            const salt = random()

            user!.authentication = {
                salt,
                password: authentication(salt, password),
            }
        }
       
        await user!.save()

        return res.status(StatusCodes.Succes).json({
            message: labels.users.generic.user_updated_succesfuly,
            statusCode: StatusCodes.Succes,
            user: user
        });
    }
    catch (error) {
        console.log(error)
        return res.sendStatus(StatusCodes.BadRequest)
    }
}

export const addCatToUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const { catId } = req.body

        const user = await getUserById(id)

        if(catId)
        {
            const cat = await getCatbyId(catId)
            if(cat)
            {
                user!.cat = cat
            }
        }
       
        await user!.save()

        return res.status(StatusCodes.Succes).json({
            message: labels.users.generic.user_updated_succesfuly,
            statusCode: StatusCodes.Succes,
            user: user
        });
    }
    catch (error) {
        console.log(error)
        return res.sendStatus(StatusCodes.BadRequest)
    }
}
