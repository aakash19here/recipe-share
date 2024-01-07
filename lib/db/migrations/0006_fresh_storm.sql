ALTER TABLE "recipe" ALTER COLUMN "is_published" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "recipe" ALTER COLUMN "cooking_time" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "recipe" ALTER COLUMN "ingredients" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "recipe" ALTER COLUMN "steps" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "recipe" ALTER COLUMN "steps" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "recipe" ALTER COLUMN "image" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "recipe" ALTER COLUMN "recipe_preference" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "recipe" ALTER COLUMN "recipe_course" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "recipe" ALTER COLUMN "recipe_type" DROP NOT NULL;