import faker from 'faker'; // Import the faker library for generating fake data
import { storeRecipeData } from "../helpers/helper.js";

// list of popular recipes
const popularRecipes = [
  "Pizza", "Pasta", "Burger", "Salad", "Sushi", "Tacos", "Steak", "Soup", 
  "Sandwich", "Tea", "Coffee", "Chicken Curry", "Fried Rice", "Pancakes", 
  "Waffles", "Lasagna", "Tiramisu", "Apple Pie", "Roast Chicken", 
  "Grilled Salmon", "Vegetable Stir Fry", "Spaghetti Bolognese", 
  "Chocolate Cake", "Cheesecake", "Beef Stew"
];

// list of food-related words
const foodWords = [
  "Chicken", "Beef", "Pork", "Tofu", "Tomato", "Onion", "Garlic", "Pepper", 
  "Salt", "Paprika", "Basil", "Parsley", "Oregano", "Thyme", "Rosemary", 
  "Cilantro", "Potato", "Carrot", "Broccoli", "Spinach", "Mushroom", "Cheese", 
  "Butter", "Olive Oil", "Soy Sauce", "Vinegar", "Sugar", "Honey", "Lemon", 
  "Lime", "Orange", "Apple", "Banana", "Strawberry", "Blueberry", "Raspberry", 
  "Chocolate", "Vanilla", "Cinnamon", "Nutmeg", "Milk", "Cream", "Yogurt", 
  "Egg", "Flour", "Rice", "Pasta", "Bread", "Wine", "Beer", "Tea", "Coffee"
];

// list of review templates
const reviewTemplates = [
  { template: "I found this recipe to be {rating}. It was {adjective}.", ratings: [4, 5], adjectives: ["excellent", "great", "amazing"] },
  { template: "This is a {rating} recipe. I think it's {adjective}.", ratings: [3], adjectives: ["good", "decent", "fair"] },
  { template: "Giving this recipe a {rating} because it's {adjective}.", ratings: [1, 2], adjectives: ["poor", "bad", "terrible"] },
];

// Function to generate recipe data
export const generateRecipeData = (recipeName: string) => {
  if (!popularRecipes.map(recipe => recipe.toLowerCase()).includes(recipeName.toLowerCase())) {
    throw new Error(`Recipe not found: ${recipeName}`);
  }
 
   // Generate a list of ingredients
  const ingredients = Array.from({ length: 5 }, () => ({
    name: faker.random.arrayElement(foodWords),
    quantity: faker.datatype.number({ min: 1, max: 5 }),
    unit: faker.random.arrayElement(["cup", "tbsp", "tsp", "g", "kg"]),
  }));

   // Generate a list of instructions based on the ingredients
  const instructions = ingredients.map((ingredient, index) => {
    return `Step ${index + 1}: Prepare ${ingredient.quantity} ${ingredient.unit} of ${ingredient.name}.`;
  }).join(' Next, ');

  // Generate a list of reviews
  const reviews = Array.from({ length: 6 }, () => {
    const reviewTemplate = faker.random.arrayElement(reviewTemplates);
    const rating = faker.random.arrayElement(reviewTemplate.ratings);
    const adjective = faker.random.arrayElement(reviewTemplate.adjectives);
    const text = reviewTemplate.template.replace('{rating}', rating.toString()).replace('{adjective}', adjective);

    return {
      reviewer: faker.name.findName(),
      rating,
      text,
    };
  });

   // Generate the full recipe data
  const generatedRecipeData = {
    recipeName,
    image: `https://picsum.photos/200/300`,
    ingredients,
    preparationTime: `${faker.datatype.number({ min: 10, max: 60 })} minutes`,
    cookingTime: `${faker.datatype.number({ min: 10, max: 240 })} minutes`,
    instructions: `Start by gathering all your ingredients. ${instructions}`,
    reviews,
  };

  // Create a new object with only the data you want to send
  const blockchainData = {
    recipeName: generatedRecipeData.recipeName,
    image: generatedRecipeData.image,
    ingredients: generatedRecipeData.ingredients,
    preparationTime: generatedRecipeData.preparationTime,
    cookingTime: generatedRecipeData.cookingTime,
    instructions: generatedRecipeData.instructions,
  };

  // Store the generated recipe data
  storeRecipeData(blockchainData).catch(console.error);

  return generatedRecipeData;
};
