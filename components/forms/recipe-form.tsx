"use client";
import { recipeSchema } from "@/lib/validation/recipe";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import dynamic from "next/dynamic";

import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  recipeCourseEnum,
  recipeCuisineEnum,
  recipeMethodEnum,
  recipePreferenceEnum,
  recipeTypeEnum,
} from "@/lib/db/schema/recipe";
import { Button } from "../ui/button";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import { ArrowRight, Upload } from "lucide-react";
import React from "react";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "../ui/use-toast";

const BlockNote = dynamic(() => import("../blocknote-editor"), { ssr: false });

export function RecipeForm() {
  const form = useForm<z.infer<typeof recipeSchema>>({
    resolver: zodResolver(recipeSchema),
  });

  const {
    fields: ingredientsField,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    name: "ingredients",
    control: form.control,
  });

  const {
    fields: requirementsField,
    append: appendRequirement,
    remove: removeRequirement,
  } = useFieldArray({
    name: "requirements",
    control: form.control,
  });

  function onSubmit(values: z.infer<typeof recipeSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-6xl mx-auto space-y-4"
      >
        <div className="w-[300px] h-[300px] flex flex-col items-center justify-center border-[3px] border-dashed mx-auto">
          <UploadButton
            onUploadProgress={(p) => {
              console.log(p);
            }}
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);
              console.log(res[0].url);
              form.setValue("image", res[0].url);
              toast({
                description: "Upload complete",
              });
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of the recipe</FormLabel>
              <FormControl>
                <Input placeholder="Butter chicken" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-3">
          <FormField
            control={form.control}
            name="cookingTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cooking Time</FormLabel>
                <FormControl>
                  <Input type="number" min={1} placeholder="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recipeCourse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe course</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select course type" />
                    </SelectTrigger>
                    <SelectContent>
                      {recipeCourseEnum.enumValues.map((value, id) => (
                        <SelectItem value={value} key={id}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recipeCuisine"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe cuisine</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select cuisine type" />
                    </SelectTrigger>
                    <SelectContent>
                      {recipeCuisineEnum.enumValues.map((value, id) => (
                        <SelectItem value={value} key={id}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recipeMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe method</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select recipe method" />
                    </SelectTrigger>
                    <SelectContent>
                      {recipeMethodEnum.enumValues.map((value, id) => (
                        <SelectItem value={value} key={id}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recipePreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe Preference</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select recipe preference" />
                    </SelectTrigger>
                    <SelectContent>
                      {recipePreferenceEnum.enumValues.map((value, id) => (
                        <SelectItem value={value} key={id}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recipeType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe Type</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select recipe type" />
                    </SelectTrigger>
                    <SelectContent>
                      {recipeTypeEnum.enumValues.map((value, id) => (
                        <SelectItem value={value} key={id}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex gap-2">
          <div className="w-1/2">
            {ingredientsField.map((field, index) => (
              <FormField
                control={form.control}
                key={field.id}
                name={`ingredients.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={clsx(index !== 0 && "sr-only")}>
                      Ingredients
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={cn("mt-2", !ingredientsField.length && "w-full")}
              onClick={() => appendIngredient({ value: "" })}
            >
              Add Ingretients
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={clsx(
                `ml-2 mt-2`,
                !ingredientsField.length ? "hidden" : ""
              )}
              onClick={() => removeIngredient(ingredientsField.length - 1)}
            >
              Remove
            </Button>
          </div>
          <div className="w-1/2">
            {requirementsField.map((field, index) => (
              <FormField
                control={form.control}
                key={field.id}
                name={`ingredients.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={clsx(index !== 0 && "sr-only")}>
                      Requirements
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={cn("mt-2", !requirementsField.length && "w-full")}
              onClick={() => appendRequirement({ value: "" })}
            >
              Add Requirements
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={clsx(
                `ml-2 mt-2`,
                !requirementsField.length ? "hidden" : ""
              )}
              onClick={() => removeRequirement(requirementsField.length - 1)}
            >
              Remove
            </Button>
          </div>
        </div>
        <div className="flex flex-col self-start gap-2 my-3">
          <FormLabel className="">Steps</FormLabel>
          <FormDescription className="flex items-center">
            Specify how to make the recipe (It's upon you how better you can
            write it)
          </FormDescription>
        </div>
        {/* Best editor so far <3 */}
        <BlockNote />
      </form>
    </Form>
  );
}
