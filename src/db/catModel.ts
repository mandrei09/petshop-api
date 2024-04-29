import mongoose, { Schema } from 'mongoose';
import { Breed, BreedSchema, breedPrefix } from "./breedModel";
import { sortAndPaginate } from './sortAndPaginate';
import { Vaccine, VaccineSchema, vaccinePrefix } from './vaccineModel';

export const CatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: BreedSchema, ref: 'Breed', required: true },
  birthDate: { type: Date },
  age: { type: Number },
  vaccine: { type: VaccineSchema, ref: 'Vaccine', required: false }
});

export const Cat = mongoose.model("Cat", CatSchema);

export const catPrefix = 'cat'

export const getCats = async (filters?: any) => {
  const catProperties = Object.keys(CatSchema.obj);
  let query: any = Cat.find().populate(breedPrefix)

  if (Object.keys(filters).length > 0) {
    catProperties.forEach(prop => {
      if (filters.hasOwnProperty(prop)) {
        if (prop == breedPrefix) {
          const breedProperties = Object.keys(BreedSchema.obj)
          breedProperties.push('_id')
          breedProperties.forEach(breedProp => {
            const breedProperty = `${breedPrefix}.${breedProp}`;
            if (filters[breedPrefix].hasOwnProperty(breedProp)) {
              const breedPropertyValue = filters[breedPrefix][breedProp];
              query = query.where(breedProperty).equals(breedPropertyValue);
            }
          })
        }
        else if(prop == vaccinePrefix)
        {
          const vaccineProperties = Object.keys(VaccineSchema.obj)
          vaccineProperties.push('_id')
          vaccineProperties.forEach(vaccineProp => {
            const vaccineProperty = `${vaccinePrefix}.${vaccineProp}`;
            if (filters[vaccinePrefix].hasOwnProperty(vaccineProp)) {
              const vaccinePropertyValue = filters[vaccinePrefix][vaccineProp];
              query = query.where(vaccineProperty).equals(vaccinePropertyValue);
            }
          })
        }
        else {
          query = query.where(prop).equals(filters[prop]);
        }
      }
    });

    query = sortAndPaginate(filters, query)
  }

  return query
}

export const getByName = (name: string) => Cat.findOne({ name });

export const getCatbyId = (id: string) => Cat.findById(id);

export const createCat = (values: Record<string, any>) =>
{
  return new Cat(values).save().then((cat) => cat.toObject());
}

export const deleteCatById = (id: string) =>
  Cat.findOneAndDelete({ _id: id }).populate(breedPrefix);


export const updateCatById = (id: string, values: Record<string, any>) =>
  Cat.findByIdAndUpdate(id, values);
