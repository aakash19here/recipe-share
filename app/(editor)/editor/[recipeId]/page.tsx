import { RecipeForm } from "@/components/forms/recipe-form";
import { db } from "@/lib/db";
import { recipes } from "@/lib/db/schema/recipe";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

export default async function EditorPage({
  params: { recipeId },
}: {
  params: { recipeId: string };
}) {
  //Fetch Post details here and pass to form

  const [recipe] = await db
    .select()
    .from(recipes)
    .where(eq(recipes.id, recipeId));

  if (!recipe) {
    redirect("/dashboard");
  }

  return (
    <div>
      <RecipeForm recipe={recipe} />
    </div>
  );
}
