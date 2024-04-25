import express from "express";
import labels from "../json/labels.json";
import { StatusCodes } from "../appconfig";
import { getUserByEmail, crateUser as createUser } from "../db/users";
import { authentication, random } from "../helpers";
import { validateEmail } from "../middlewares/validateEmail";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username, firstName, lastName } = req.body;
    
    const salt = random();

    const user = await createUser({
      email,
      username,
      firstName,
      lastName,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res
      .status(StatusCodes.Succes)
      .json({
        message: labels.users.generic.user_created_succesfuly,
        statusCode: StatusCodes.Succes,
        user: user,
      });

  } 
  catch (error) {
    console.log(error);
    return res.sendStatus(StatusCodes.BadRequest);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password} = req.body;

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password')

        const expectedHash = authentication(user!.authentication!.salt!, password)

        if(user!.authentication!.password != expectedHash)
        {
          return res.status(StatusCodes.BadRequest).json({
            message: labels.users.password.incorrect_password_label,
            statusCode: StatusCodes.BadRequest,
          });
        }

        const salt = random()
        user!.authentication!.sessionToken! = authentication(salt, user!._id.toString())

        await user!.save()
        res.cookie('token',user!.authentication!.sessionToken!, {domain : 'localhost', path: '/'})

        return res.status(StatusCodes.Succes).json({
          message: labels.users.generic.user_was_logged_in,
          statusCode: StatusCodes.Succes,
        });
      } 
      catch (error) {
        console.log(error);
        return res.sendStatus(StatusCodes.BadRequest);
      }
}

