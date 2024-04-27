import axios, { AxiosError } from "axios";

const API_URL = "https://vigilant-doodle-56xrrgg4gprc44v-3000.app.github.dev/api/recipes";

export const getRecipeData = async (recipeName: string): Promise<Recipe> => {
  return new Promise<Recipe>((resolve, reject) => {
    axios
      .get(`${API_URL}/${recipeName}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 404) {
          reject("Recipe not found");
        } else {
          reject(error.message);
        }
      });
  });
};
