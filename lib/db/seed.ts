import { faker } from "@faker-js/faker";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/lib/env.mjs";
import { nanoid } from "nanoid";
import { users } from "./schema/auth";

if (!("DATABASE_URL" in process.env))
  throw new Error("DATABASE_URL not found on .env.development");

const runSeed = async () => {
  const client = postgres(env.DATABASE_URL, { max: 1 });
  const db = drizzle(client);
  const data: (typeof users.$inferInsert)[] = [];

  for (let i = 0; i < 1; i++) {
    data.push({
      id: nanoid(),
      email: faker.internet.email(),
      emailVerified: null,
      image: faker.internet.avatar(),
      name: faker.person.firstName(),
    });
  }

  console.log("⏳ Seeding dummy data...");

  await db.insert(users).values(data);

  console.log("✅ Seeding completed");

  process.exit(0);
};

runSeed().catch((e) => {
  console.error("❌ Seeding failed");
  console.log(e);
  process.exit(1);
});
