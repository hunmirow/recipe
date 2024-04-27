import express from "express";
import recipeRoute from "./routes/recipeRoute.js";
import cors from "cors";
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());
app.use("/api/recipes", recipeRoute);
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
//# sourceMappingURL=server.js.map