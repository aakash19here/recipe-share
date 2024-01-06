import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/shell";
import { authOptions, getUserAuth } from "@/lib/auth/utils";
import { DashboardHeader } from "@/components/header";
import { Button } from "@/components/ui/button";
import { fontHeading } from "@/lib/font";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const user = await getUserAuth();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <DashboardShell>
      <DashboardHeader
        className={fontHeading.className}
        heading="Recipes"
        text="Create and manage recipes."
      >
        <Button>New Recipe</Button>
      </DashboardHeader>
      You don't have any recipes created.
    </DashboardShell>
  );
}
