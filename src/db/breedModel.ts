import mongoose from "mongoose";

const BreedSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

export const BreedModel = mongoose.model("Breed", BreedSchema);

export const getBreeds = () => BreedModel.find();

export const getByName = (name: string) => BreedModel.findOne({ name });

export const getBreedbyId = (id: string) => BreedModel.findById(id);

export const createBreed = (values: Record<string, any>) =>
  new BreedModel(values).save().then((breed) => breed.toObject());

export const deleteBreedById = (id: string) =>
  BreedModel.findOneAndDelete({ _id: id });


export const updateBreedById = (id: string, values: Record<string, any>) =>
  BreedModel.findByIdAndUpdate(id, values);
