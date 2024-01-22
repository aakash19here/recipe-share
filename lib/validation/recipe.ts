import * as z from "zod";

export const recipeSchema = z.object({
  name: z.string().min(1),
  cookingTime: z.string().min(1),

  steps: z.any(),

  ingredients: z
    .array(
      z.object({
        value: z.string(),
      })
    )
    .nonempty({
      message: "There should be atleast one ingredient used",
    }),
  requirements: z
    .array(
      z.object({
        value: z.string(),
      })
    )
    .nonempty({
      message: "There should be atleast one ingredient used",
    }),
  // image: z.string().min(1),
  image: z.string().optional(),
  recipePreference: z.string(),
  recipeCourse: z.string(),
  recipeCuisine: z.string().optional(),
  recipeMethod: z.string().optional(),
  recipeType: z.string(),
});
