import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const notesT = sqliteTable("note", {
  id: int().primaryKey({ autoIncrement: true }),
  time: int().notNull(),
  text: text().notNull(),
  type: int().notNull().$type<NoteType>(),
  scope: int().notNull().$type<NoteScope>(),
  parentID: int(),
});

export enum NoteType {
  NOTE,
  TODO,
  DONE,
}

export enum NoteScope {
  DAY,
  MONTH,
  YEAR,
}

export type NoteS = typeof notesT.$inferSelect;
export type NoteI = typeof notesT.$inferInsert;
