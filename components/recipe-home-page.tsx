import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import SignIn from "@/components/auth/SignIn";
import { getUserAuth } from "@/lib/auth/utils";
import { CreateRecipeButton } from "./create-recipe";

export async function RecipeHomePage() {
  const { session } = await getUserAuth();

  const nameExists = !!session?.user.name && session?.user.name.length > 2;

  return (
    <main className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="flex items-center justify-between p-6 bg-white dark:bg-gray-800">
        <Link
          className="text-2xl font-bold text-gray-900 dark:text-gray-100"
          href="#"
        >
          RecipeShare
        </Link>
        <div className="flex items-center space-x-4">
          <Input className="w-64" placeholder="Search for recipes..." />
          <Button>Share Your Recipe</Button>
        </div>
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>
                  {nameExists
                    ? session.user.name
                        ?.split(" ")
                        .map((word) => word[0].toUpperCase())
                        .join("")
                    : "~"}
                </AvatarFallback>
                <AvatarImage src={session.user?.image || ""} alt={"logo"} />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <span className="font-semibold">
                  {nameExists ? session.user.name : "New User"}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/account">
                <DropdownMenuItem className="cursor-pointer">
                  Account
                </DropdownMenuItem>
              </Link>
              <Link href="/api/auth/signout">
                <DropdownMenuItem className="cursor-pointer">
                  Sign out
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <SignIn />
        )}
      </header>
      <section
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.svg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center p-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">
              Discover and Share Amazing Recipes
            </h1>
            <p className="text-lg text-gray-200">
              Join our community of food lovers and home cooks.
            </p>
          </div>
        </div>
      </section>
      <section className="container mx-auto p-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Featured Recipe of the Day</h2>
          <div className="flex items-center space-x-4">
            <div
              className="rounded-lg bg-slate-600 object-cover h-200 w-200"
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
            />
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Delicious Pancakes</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Start your day with these fluffy and delicious pancakes.
              </p>
              <Link
                className="inline-flex items-center justify-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                href="#"
              >
                View Recipe
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto p-6 grid gap-6 md:grid-cols-3">
        <div className="space-y-4">
          <div
            className="rounded-lg bg-slate-600 h-75 w-75"
            style={{
              aspectRatio: "100/100",
            }}
          />
          <h3 className="text-xl font-bold">Breakfast Delights</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Start your day right with these delicious breakfast recipes.
          </p>
        </div>
        <div className="space-y-4">
          <div
            className="rounded-lg bg-slate-600 object-cover h-100 w-100"
            style={{
              aspectRatio: "100/100",
            }}
          />
          <h3 className="text-xl font-bold">Savory Main Courses</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Explore our collection of hearty and flavorful main courses.
          </p>
        </div>
        <div className="space-y-4">
          <div
            className="rounded-lg bg-slate-600 object-cover h-100 w-100"
            style={{
              aspectRatio: "100/100",
            }}
          />
          <h3 className="text-xl font-bold">Decadent Desserts</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Indulge in these sweet and decadent dessert recipes.
          </p>
        </div>
      </section>
      <footer className="p-6 bg-white dark:bg-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-gray-600 dark:text-gray-400">
            © RecipeShare. All rights reserved.
          </div>
          <nav className="space-x-4">
            <Link
              className="text-gray-600 dark:text-gray-400 hover:underline"
              href="#"
            >
              About Us
            </Link>
            <Link
              className="text-gray-600 dark:text-gray-400 hover:underline"
              href="#"
            >
              Contact
            </Link>
            <Link
              className="text-gray-600 dark:text-gray-400 hover:underline"
              href="#"
            >
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
