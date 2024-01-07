"use server";

import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { recipes } from "@/lib/db/schema/recipe";
import { recipeSchema } from "@/lib/validation/recipe";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import slugify from "slugify";
import * as z from "zod";

export async function createRecipe(name: string) {
  const { session } = await getUserAuth();

  if (!session) throw new Error("Unauthorized");

  const { user } = session;

  try {
    const [response] = await db
      .insert(recipes)
      .values({
        id: nanoid(),
        name: name.trim(),
        slug: slugify(name, {
          lower: true,
          trim: true,
        }),
        userId: user.id,
      })
      .returning();

    return response.id;
  } catch (e) {
    throw new Error("[RECIPE_CREATION_ERROR]");
  }
}

export async function updateRecipe(
  recipe: z.infer<typeof recipeSchema>,
  recipeId: string
) {
  const { session } = await getUserAuth();

  if (!session) throw new Error("Unauthorized");

  const parsedRecipe = recipeSchema.parse(recipe);

  await db
    .update(recipes)
    .set({
      name: parsedRecipe.name.trim(),
      cookingTime: parseInt(parsedRecipe.cookingTime),
      isPublished: true,
      //@ts-expect-error
      recipeCourse: parsedRecipe.recipeCourse,
      //@ts-expect-error
      recipeMethod: parsedRecipe.recipeMethod,
      //@ts-expect-error
      recipeCuisine: parsedRecipe.recipeCuisine,
      //@ts-expect-error
      recipePreference: parsedRecipe.recipePreference,
      //@ts-expect-error
      recipeType: parsedRecipe.recipeType,
      steps: parsedRecipe.steps,
      updatedAt: new Date(),
      image: parsedRecipe.image,
      ingredients: String(parsedRecipe.ingredients.map((v) => v.value)),
      requirements: String(parsedRecipe.requirements.map((v) => v.value)),
      slug: slugify(parsedRecipe.name, {
        lower: true,
        trim: true,
      }),
    })
    .where(eq(recipes.id, recipeId));
}
