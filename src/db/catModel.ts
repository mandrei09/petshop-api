import mongoose, { Schema } from 'mongoose';
import { Breed, BreedSchema, breedProperty as breedPrefix } from "./breedModel";
import { sortAndPaginate } from './sortAndPaginate';

export const CatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: Schema.Types.ObjectId, ref: 'Breed', required: true },
  birthDate: { type: Date },
  age: { type: Number }
});

export const Cat = mongoose.model("Cat", CatSchema);

export const getCats = async (filters?: any) => {
  const catProperties = Object.keys(CatSchema.obj);
  let query: any = Cat.find().populate(breedPrefix)

  if(Object.keys(filters).length > 0)
  {
    catProperties.forEach(prop => {
      if(prop == breedPrefix)
      {
        const breedProperties = Object.keys(BreedSchema.obj)
        breedProperties.push('_id')
        breedProperties.forEach(breedProp =>{
          const breedProperty = `${breedPrefix}.'${breedProp}`;
          if (filters[breedPrefix].hasOwnProperty(breedProp)) {
            const breedPropertyValue = filters[breedPrefix][breedProp];
            query = query.where(breedProperty).equals(breedPropertyValue);
          }
        })
      }
      else if (filters.hasOwnProperty(prop)) {
        query = query.where(prop).equals(filters[prop]);
      }
    });
  
    query = sortAndPaginate(filters,query)
  }

  return query
}

export const getByName = (name: string) => Cat.findOne({ name });

export const getCatbyId = (id: string) => Cat.findById(id);

export const createCat = (values: Record<string, any>) =>
  new Cat(values).save().then((cat) => cat.toObject());

export const deleteCatById = (id: string) =>
  Cat.findOneAndDelete({ _id: id }).populate(breedPrefix);


export const updateCatById = (id: string, values: Record<string, any>) =>
  Cat.findByIdAndUpdate(id, values);
