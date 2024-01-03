DO $$ BEGIN
 CREATE TYPE "recipe_type" AS ENUM('veg', 'non_veg', 'vegan');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"cooking_time" integer NOT NULL,
	"ingredients" text NOT NULL,
	"requirements" text,
	"steps" json NOT NULL,
	"slug" varchar(256) NOT NULL,
	"image" text NOT NULL,
	"likes" integer DEFAULT 0 NOT NULL,
	"dislikes" integer DEFAULT 0 NOT NULL,
	"recipe_type" "recipe_type",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"userId" text
);
