import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/shell";
import { authOptions, getUserAuth } from "@/lib/auth/utils";
import { DashboardHeader } from "@/components/header";
import { fontHeading } from "@/lib/font";
import { CreateRecipeButton } from "@/components/create-recipe";
import { db } from "@/lib/db";
import { recipes } from "@/lib/db/schema/recipe";
import { eq } from "drizzle-orm";
import { RecipeItem } from "@/components/recipe-item";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const { session } = await getUserAuth();

  if (!session) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const { user } = session;

  const userRecipes = await db
    .select()
    .from(recipes)
    .where(eq(recipes.userId, user.id));

  console.log(userRecipes);

  return (
    <DashboardShell>
      <DashboardHeader
        className={fontHeading.className}
        heading="Recipes"
        text="Create and manage recipes."
      >
        <CreateRecipeButton />
      </DashboardHeader>
      <div className="divide-y divide-border rounded-md border">
        {userRecipes.map((recipe) => (
          <RecipeItem key={recipe.id} post={recipe} />
        ))}
      </div>
      You don't have any recipes created.
    </DashboardShell>
  );
}
