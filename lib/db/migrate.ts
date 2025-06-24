import { migrate } from "drizzle-orm/neon-http/migrator"
import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"

import * as dotenv from "dotenv"

dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
    throw new Error("Database url is not set");
}

async function runMigration() {
    try {
        const psql = neon(process.env.DATABASE_URL!);
        const db = drizzle(psql);

        await migrate(db, { migrationsFolder: "./drizzle" })
        console.log("========All migration successfully done===========")
    } catch (error) {
        console.error(error)
        process.exit(1);
    }
    
}

runMigration()