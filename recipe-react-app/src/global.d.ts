// Defining the structure of a Recipe
interface Recipe {
  recipeName: string;
  ingredients: Ingredient[];
  preparationTime: string;
  cookingTime: string;
  instructions: string;
  image: string;
  reviews: Review[];
}

// Defining the structure of an Ingredient
interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

// Defining the structure of a Review
interface Review {
  reviewer: string;
  rating: number;
  text: string;
}
