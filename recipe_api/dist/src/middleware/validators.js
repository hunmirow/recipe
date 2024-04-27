import { param } from "express-validator";
export const validateRecipeName = param("recipeName")
    .isString()
    .notEmpty()
    .withMessage("Recipe name must be a non-empty string");
//# sourceMappingURL=validators.js.map