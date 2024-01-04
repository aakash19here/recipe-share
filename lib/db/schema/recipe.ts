import { relations } from "drizzle-orm";
import {
  integer,
  json,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "@/lib/db/schema/auth";

export const recipePreferenceEnum = pgEnum("recipe_preference", [
  "veg",
  "non_veg",
  "vegan",
  "glutten_free",
  "keto",
]);

export const recipeCourseEnum = pgEnum("recipe_course", [
  "dessert",
  "starter",
  "main_course",
]);

export const recipeCuisineEnum = pgEnum("recipe_cuisine", [
  "italian",
  "mexican",
  "indian",
  "french",
  "chinese",
  "japanese",
]);

export const recipeMethodEnum = pgEnum("recipe_method", [
  "grilled",
  "baked",
  "fried",
  "steamed",
]);

export const recipeTypeEnum = pgEnum("recipe_type", [
  "breakfast",
  "brunch",
  "dinner",
  "snacks",
]);

export const recipes = pgTable("recipe", {
  id: text("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  cookingTime: integer("cooking_time").notNull(),
  ingredients: text("ingredients").notNull(),
  requirements: text("requirements"),
  steps: json("steps").notNull(),
  slug: varchar("slug", { length: 256 }).notNull(),
  image: text("image").notNull(),
  likes: integer("likes").notNull().default(0),
  dislikes: integer("dislikes").notNull().default(0),
  recipePreference: recipePreferenceEnum("recipe_preference").notNull(),
  recipeCourse: recipeCourseEnum("recipe_course").notNull(),
  recipeCuisine: recipeCuisineEnum("recipe_cuisine"),
  recipeMethod: recipeMethodEnum("recipe_method"),
  recipeType: recipeTypeEnum("recipe_type").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
});

export const recipeRelations = relations(recipes, ({ one }) => ({
  user: one(users, {
    fields: [recipes.userId],
    references: [users.id],
  }),
}));
