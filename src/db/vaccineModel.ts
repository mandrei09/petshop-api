import mongoose from "mongoose";
import { sortAndPaginate } from "./sortAndPaginate";
import { addMonths } from "../helpers/addMonths";

export const VaccineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  expiringInMonths: { type: Number, required: true },
  administratedAt: { type: Date, required: false },
  expiringAt: { type: Date, required: false },
});

export const Vaccine = mongoose.model("Vaccine", VaccineSchema);

export const vaccinePrefix = 'vaccine'

export const getVaccines = async (filters? : any) => 
{
  const vaccineProperties = Object.keys(VaccineSchema.obj);

  let query : any = Vaccine.find()

  if(Object.keys(filters).length > 0){
    vaccineProperties.forEach(prop => {
      if (filters.hasOwnProperty(prop)) {
        query = query.where(prop).equals(filters[prop]);
      }
    });
    
    query = sortAndPaginate(filters,query)
  }

  return query
}

export const getByName = (name: string) => Vaccine.findOne({ name });

export const getVaccineById = (id: string) => Vaccine.findById(id);

export const createVaccine = (values: Record<string, any>) =>
  new Vaccine(values).save().then((vaccine) => vaccine.toObject());

export const deleteVaccineById = (id: string) =>
  Vaccine.findOneAndDelete({ _id: id });

export const updateVaccineById = (id: string, values: Record<string, any>) =>
  Vaccine.findByIdAndUpdate(id, values);
