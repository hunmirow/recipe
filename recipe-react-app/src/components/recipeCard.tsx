import React, { useState } from "react"; // Importing necessary libraries and components
import { getRecipeData } from "../api/actions";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";

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

// List of popular recipes
const popularRecipes = [
  "Pizza", "Pasta", "Burger", "Salad", "Sushi", "Tacos", "Steak", "Soup", 
  "Sandwich", "Tea", "Coffee", "Chicken Curry", "Fried Rice", "Pancakes", 
  "Waffles", "Lasagna", "Tiramisu", "Apple Pie", "Roast Chicken", 
  "Grilled Salmon", "Vegetable Stir Fry", "Spaghetti Bolognese", 
  "Chocolate Cake", "Cheesecake", "Beef Stew"
];

// RecipeCard component
const RecipeCard: React.FC = () => {
  const [data, setData] = useState<Recipe | undefined>();
  const [loadingState, setLoadingState] = useState(false);
  const [recipeName, setRecipeName] = useState("");
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [inputClicked, setInputClicked] = useState(false);

   // Function to handle search
  const handleSearch = () => {
    console.log("Fetching Recipe Data...");
    console.log(recipeName);
    setLoadingState(true);
  
    // Check if the recipe is in the list of popular recipes
    if (!popularRecipes.map(recipe => recipe.toLowerCase()).includes(recipeName.toLowerCase())) {
      setError(`No Recipe For ${recipeName} Today`);
      setLoadingState(false);
      setData(undefined);
      return;
    }
  
     // Fetch recipe data
    getRecipeData(recipeName) // Fetch recipe data
      .then((res) => {
        setError("");
        if (res) {
          console.log(res);
          setData(res);
          setLoadingState(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoadingState(false);
        setData(undefined);
        setError(error);
      });
  };  

  // The component starts rendering here
  return (
    <div>
      <Card className="max-w-[700px]">

      // The CardHeader component is used to display the header of the card
        <CardHeader className="flex gap-3"> 
          <form

            // When the form is submitted, it prevents the default form submission event and calls the handleSearch function
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            style={{ margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >

          // The CardBody component is used to display the body of the card
            <CardBody>
              <div className="flex flex-col items-center">
                <p className="text-xl font-bold">Curious - <span className="text-2xl">[<span className="text-red-600 font-extrabold">?</span>]</span></p>
              </div>
            </CardBody>
            <div className="flex flex-col w-full p-0 space-y-3">
              <Input
                id="recipeName"
                type="text"
                label="Enter a Recipe Name"
                value={recipeName}
                className={`transition-all duration-500 ease-in-out transform ${isFocused ? 'scale-100' : 'scale-75'}`}
                
                // When the value of the input changes, it updates the recipeName state variable and sets the inputClicked state variable to true
                onChange={(e) => {
                  setRecipeName(e.target.value);
                  setInputClicked(true);
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />

              // If there's an error, it displays the error message
              {error && <p className="text-xs text-red-600 text-center">{error}</p>}
              {error && 
                <Card className="max-w-[400px] mt-4 bg-gray-200">
                  <CardBody>
                    <p className="text-xs text-red-600 text-center font-bold">Available Recipes:</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                      {popularRecipes.map((recipe, index) => (
                        <div key={index} className="text-xs text-red-600">
                          {recipe}{index < popularRecipes.length - 1 ? ', ' : ''}
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              }
              <div className="flex justify-center items-center">
                <Button
                  className="w-32"
                  color="primary"
                  isLoading={loadingState}
                  type="submit"
                  disabled={!inputClicked}
                  onClick={() => {
                    handleSearch();
                    setInputClicked(false);
                  }}
                >
                  Start Guide
                </Button>
              </div>
            </div>
          </form>
        </CardHeader>
        <Divider /> // A Divider component is used to visually separate different sections of the component

        // If there's data, it displays the recipe data
        {data ? (
          <div className="flex flex-col items-center mt-2">
            <h1 className="text-xl font-bold text-center">Our {data.recipeName} Recipe For You Today</h1>
            <Card className="max-w-[700px] mt-1">
              <CardBody>
                <div className="grid gap-3 mt-0">
                  <div>
                    <div className="flex flex-col items-center text-left">
                      <p className="text-lg font-bold mt-0">Ingredients:</p>
                      <div className="flex justify-center items-center mt-1">
                        <div className="bg-gray-200 p-2 rounded text-left">
                          {data.ingredients.map((ingredient, index) => (
                            <p key={index}>
                              {ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1)}: 
                              <span className="font-bold text-yellow-600"> {ingredient.quantity}</span> 
                              <span className="text-yellow-600">{ingredient.unit}</span>
                            </p>
                          ))}
                        </div>
                      </div>
                      <p className="text-lg font-bold mt-4">Preparation Time: {data.preparationTime} minutes</p>
                      <p className="text-lg font-bold mt-4">Cooking Time: {data.cookingTime} minutes</p>
                    </div>
                    <Card className="max-w-[700px] mt-1">
                      <CardBody style={{ paddingLeft: '20px' }}>
                        <p className="text-lg font-bold mt-2">Instructions:</p>
                        <div style={{ paddingLeft: '20px' }}>
                          {data.instructions.split('.').map((instruction, index) => (
                            <p key={index} className="text-lg mb-2">
                              {instruction.trim()}
                            </p>
                          ))}
                        </div>
                      </CardBody>
                    </Card>
                    <p className="text-lg mt-2">Once all ingredients are prepared, combine them as desired and cook for the recommended time.</p>
                    <p className="text-lg mt-2">Enjoy your meal!</p>
                    <Divider style={{ margin: '1rem 0' }} />
                    <CardBody className="flex justify-center items-center">
                      <p className="text-lg">
                        Reviews:{" "}

                        // A Button component is used to submit the form
                        <Button
                          className=""
                          color="primary"
                          onClick={() => setShowReviews(!showReviews)}
                        >
                          {showReviews ? "Hide" : data.reviews.length}
                        </Button>
                      </p>
                    </CardBody>
                  </div>
                </div>
              </CardBody>       
            </Card>
          </div>
        ) : (

           // If there's no data, it displays a message
          <CardBody>
            <div className="flex flex-col items-center">
              <p className="text-xs font-bold text-gray-500">We Make Cooking Easy</p>
            </div>
          </CardBody>
        )}
        <Divider />  // A Divider component is used to visually separate different sections of the component
        <CardFooter>
          <div className="flex flex-col items-left">

          // If there's data, it displays a success message
            {data && (
              <p className="text-xs  text-gray-600 ">Last update successful.</p>
            )}

            // If there's no data, it displays a waiting message
            {!data && (
              <p className="text-xs  text-gray-600 ">Waiting for input...</p>
            )}
          </div>
        </CardFooter>
      </Card>
      {showReviews && data && (
        <Card className="max-w-[700px]  mt-4">
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-500">Reviews</h2>
          </CardHeader>

          // If showReviews is true and there's data, it displays the reviews
          <CardBody>
            <div className="grid grid-cols-2 gap-4">
              {data.reviews.map((review, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded">
                  <h2 className="text-lg font-bold text-gray-500">Review by {review.reviewer}</h2>
                  <p className="text-lg">Rating: <span className="text-blue-500">{review.rating}</span></p>
                  <p className="text-lg">Review: {review.text}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default RecipeCard;
