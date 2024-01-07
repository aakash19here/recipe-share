"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Loader2, PencilLine } from "lucide-react";
import { createRecipe } from "@/app/action/recipe";
import React from "react";
import { toast } from "./ui/use-toast";
import { useFormStatus } from "react-dom";
import { catchError } from "@/lib/utils";

export function CreateRecipeButton() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const NameSchema = z.object({
    name: z.string().min(5, {
      message: "Name of the recipe must be atleast 5 characters long",
    }),
  });

  const form = useForm<z.infer<typeof NameSchema>>({
    resolver: zodResolver(NameSchema),
    defaultValues: {
      name: "",
    },
  });

  const router = useRouter();

  async function handleSubmit(data: z.infer<typeof NameSchema>) {
    setIsLoading(true);

    try {
      const recipeId = await createRecipe(data.name);

      // This forces a cache invalidation.
      router.refresh();

      router.push(`/editor/${recipeId}`);
    } catch (e) {
      catchError(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New Recipe</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new recipe</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            Can be changed later
            <PencilLine className="w-5 h-5" />
          </DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isLoading}
                className="flex justify-between items-center gap-2"
              >
                {isLoading && <Loader2 className="animate-spin w-5 h-5" />}
                Create
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
