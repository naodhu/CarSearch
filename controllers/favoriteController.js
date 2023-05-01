import Car from "../models/Car.js";
import Favorite from "../models/Favorite.js";

export const getFavorites = async (req, res) => {
  const favorites = await Favorite.find({ user: req.user._id }).populate("car");

  res.status(200).json({ favorites });
};

// Add a car to the user's favorites
export const addFavorite = async (req, res) => {
  const { carId } = req.body;

  const car = await Car.findById(carId);
  if (!car) {
    return res.status(404).json({ message: "Car not found" });
  }

  const existingFavorite = await Favorite.findOne({
    user: req.user._id,
    car: car._id,
  });

  if (existingFavorite) {
    return res.status(400).json({ message: "Car is already in favorites" });
  }

  const newFavorite = new Favorite({
    user: req.user._id,
    car: car._id,
  });

  await newFavorite.save();

  res.status(201).json({ favorite: newFavorite });
};

// Add a user to another user's favorites
export const addUserFavorite = async (req, res) => {
  const { favoriteUserId } = req.body;

  const favoriteUser = await User.findById(favoriteUserId);
  if (!favoriteUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const currentUser = req.user;

  if (!currentUser.favorites) {
    currentUser.favorites = [];
  }

  if (currentUser.favorites.includes(favoriteUserId)) {
    return res.status(400).json({ message: "User is already in favorites" });
  }

  currentUser.favorites.push(favoriteUserId);
  await currentUser.save();

  res
    .status(201)
    .json({ message: "User added to favorites", user: currentUser });
};

// Remove a car from the user's favorites
export const deleteFavorite = async (req, res) => {
  const favorite = await Favorite.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!favorite) {
    return res.status(404).json({ message: "Favorite not found" });
  }

  res.status(200).json({ message: "Favorite removed successfully" });
};
