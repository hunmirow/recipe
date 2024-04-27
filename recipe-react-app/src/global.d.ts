interface Recipe {
  recipeName: string;
  ingredients: Ingredient[];
  preparationTime: string;
  cookingTime: string;
  instructions: string;
  image: string;
  reviews: Review[];
}

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

interface Review {
  reviewer: string;
  rating: number;
  text: string;
}
