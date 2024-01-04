DO $$ BEGIN
 CREATE TYPE "recipe_course" AS ENUM('dessert', 'starter', 'main_course');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "recipe_cuisine" AS ENUM('italian', 'mexican', 'indian', 'french', 'chinese', 'japanese');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "recipe_method" AS ENUM('grilled', 'baked', 'fried', 'steamed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "recipe_preference" AS ENUM('veg', 'non_veg', 'vegan', 'glutten_free', 'keto');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "recipe_type" ADD VALUE 'breakfast';--> statement-breakpoint
ALTER TYPE "recipe_type" ADD VALUE 'brunch';--> statement-breakpoint
ALTER TYPE "recipe_type" ADD VALUE 'dinner';--> statement-breakpoint
ALTER TYPE "recipe_type" ADD VALUE 'snacks';--> statement-breakpoint
ALTER TABLE "recipe" ALTER COLUMN "recipe_type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "recipe" ADD COLUMN "recipe_preference" "recipe_preference" NOT NULL;--> statement-breakpoint
ALTER TABLE "recipe" ADD COLUMN "recipe_course" "recipe_course" NOT NULL;--> statement-breakpoint
ALTER TABLE "recipe" ADD COLUMN "recipe_cuisine" "recipe_cuisine";--> statement-breakpoint
ALTER TABLE "recipe" ADD COLUMN "recipe_method" "recipe_method";