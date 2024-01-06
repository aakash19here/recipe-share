import * as z from "zod";

export const recipeSchema = z.object({
  name: z.string().min(1),
  cookingTime: z.number().min(1),
  ingredients: z.array(
    z.object({
      value: z.string(),
    })
  ),
  requirements: z.array(
    z.object({
      value: z.string(),
    })
  ),
  image: z.string().min(1),
  recipePreference: z.string(),
  recipeCourse: z.string().optional(),
  recipeCuisine: z.string().optional(),
  recipeMethod: z.string().optional(),
  recipeType: z.string(),
});
