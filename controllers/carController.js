import Car from "../models/Car.js";

// Get all cars
export const getCars = async (req, res) => {
  const cars = await Car.find();
  res.status(200).json({ cars });
};

// Get a car by ID
export const getCarById = async (req, res) => {
  const car = await Car.findById(req.params.id);

  if (!car) {
    return res.status(404).json({ message: "Car not found" });
  }

  res.status(200).json({ car });
};

// Create a new car
export const createCar = async (req, res) => {
  const { objectId, Category, Make, Model, Year } = req.body;

  const existingCar = await Car.findOne({ objectId });
  if (existingCar) {
    return res.status(400).json({ message: "Car already exists" });
  }

  const newCar = new Car({
    objectId,
    Category,
    Make,
    Model,
    Year,
  });

  await newCar.save();

  res.status(201).json({ car: newCar });
};

// Update a car
export const updateCar = async (req, res) => {
  const { objectId, Category, Make, Model, Year } = req.body;

  const car = await Car.findById(req.params.id);
  if (!car) {
    return res.status(404).json({ message: "Car not found" });
  }

  car.objectId = objectId;
  car.Category = Category;
  car.Make = Make;
  car.Model = Model;
  car.Year = Year;

  await car.save();

  res.status(200).json({ car });
};

// Delete a car
export const deleteCar = async (req, res) => {
  const car = await Car.findById(req.params.id);

  if (!car) {
    return res.status(404).json({ message: "Car not found" });
  }

  await car.remove();

  res.status(200).json({ message: "Car deleted successfully" });
};
