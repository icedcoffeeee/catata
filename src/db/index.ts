import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "./schema";
import { eq } from "drizzle-orm";

export const DB_NAME = "db.db";

export const expo_sqlite = openDatabaseSync(DB_NAME, {
  enableChangeListener: true,
});
export const db = drizzle(expo_sqlite, { schema });

export * from "./schema";

export async function addNote(note?: schema.NoteI) {
  if (!note) return;
  let parents;
  if (!note.id)
    parents = await db.insert(schema.notesT).values(note).returning();
  else
    parents = await db
      .update(schema.notesT)
      .set(note)
      .where(eq(schema.notesT.id, note.id))
      .returning();
  return parents[0];
}
export async function delNote(note?: schema.NoteI) {
  if (!note || !note.id) return;
  else await db.delete(schema.notesT).where(eq(schema.notesT.id, note.id));
}
