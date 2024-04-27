import express from "express";
import { getRecipeData } from "../controllers/recipeController.js";
import { validateRecipeName } from "../middleware/validators.js";

const router = express.Router();

router.get("/:recipeName", validateRecipeName, getRecipeData);

export default router;
