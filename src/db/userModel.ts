import mongoose, { Schema } from "mongoose";
import { CatSchema, catPrefix } from "./catModel";
import { sortAndPaginate } from "./sortAndPaginate";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  cat: { type: CatSchema, ref: 'Cat', required: false },
});

export const User = mongoose.model("User", UserSchema);

export const getUsers = async (filters?: any) => {
  const userProperties = Object.keys(UserSchema.obj);
  let query: any = User.find()

  if (Object.keys(filters).length > 0) {
    userProperties.forEach(prop => {
      if (filters.hasOwnProperty(prop)) 
      {
        if(prop == catPrefix)
          {
            const catProperties = Object.keys(CatSchema.obj)
            catProperties.push('_id')
            catProperties.forEach(catProp =>{
              const breedProperty = `${catPrefix}.${catProp}`;
              if (filters[catPrefix].hasOwnProperty(catProp)) {
                const breedPropertyValue = filters[catPrefix][catProp];
                query = query.where(breedProperty).equals(breedPropertyValue);
              }
            })
          }
          else{
            query = query.where(prop).equals(filters[prop]);
          }
      }
    });

    query = sortAndPaginate(filters, query)
  }

  return query
}

export const getUserByEmail = (email: string) => User.findOne({ email });

export const getUserByUsername = (username: string) => User.findOne({ username });

export const getUserBySessionToken = (sessionToken: string) =>
  User.findOne({
    "authentication.sessionToken": sessionToken,
  });

export const getUserById = (id: string) => User.findById(id);

export const crateUser = (values: Record<string, any>) =>
  new User(values).save().then((user) => user.toObject());

export const deleteUserById = (id: string) =>
  User.findOneAndDelete({ _id: id });

export const updateUserById = (id: string, values: Record<string, any>) =>
  User.findByIdAndUpdate(id, values);
