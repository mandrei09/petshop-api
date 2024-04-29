import { filter } from "lodash";
import mongoose from "mongoose";
import { sortAndPaginate } from "./sortAndPaginate";

export const BreedSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

export const Breed = mongoose.model("Breed", BreedSchema);

export const breedPrefix = 'breed'

export const getBreeds = async (filters? : any) => 
{
  const breedProperties = Object.keys(BreedSchema.obj);

  let query : any = Breed.find()

  if(Object.keys(filters).length > 0){
    breedProperties.forEach(prop => {
      if (filters.hasOwnProperty(prop)) {
        query = query.where(prop).equals(filters[prop]);
      }
    });
    
    query = sortAndPaginate(filters,query)
  }

  return query
}

export const getByName = (name: string) => Breed.findOne({ name });

export const getBreedbyId = (id: string) => Breed.findById(id);

export const createBreed = (values: Record<string, any>) =>
  new Breed(values).save().then((breed) => breed.toObject());

export const deleteBreedById = (id: string) =>
  Breed.findOneAndDelete({ _id: id });


export const updateBreedById = (id: string, values: Record<string, any>) =>
  Breed.findByIdAndUpdate(id, values);
