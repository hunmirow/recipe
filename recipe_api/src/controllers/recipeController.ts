import { Request, Response } from "express";
import { generateRecipeData } from "../services/recipeService.js";
import { validationResult } from "express-validator";

export const getRecipeData = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.error("Validation error", errors.mapped());
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    let { recipeName } = req.params;
    recipeName = recipeName.charAt(0).toUpperCase() + recipeName.slice(1); // Capitalize the first letter

    const finalRecipeData = generateRecipeData(recipeName);

    res.status(200).json(finalRecipeData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error in fetching recipe data");
  }
};
