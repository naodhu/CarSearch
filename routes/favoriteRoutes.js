import express from "express";
import {
  getFavorites,
  addFavorite,
  addUserFavorite,
  deleteFavorite,
} from "../controllers/favoriteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getFavorites).post(protect, addFavorite);
router.route("/users/:userId").post(protect, addUserFavorite);
router.route("/:id").delete(protect, deleteFavorite);

export default router;
