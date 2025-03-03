import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "./schema";

export const DB_NAME = "db.db";

export const expo_sqlite = openDatabaseSync(DB_NAME, {
  enableChangeListener: true,
});
export const db = drizzle(expo_sqlite, { schema });

export * from "./schema";
