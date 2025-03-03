import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const notesT = sqliteTable("note", {
  id: int().primaryKey({ autoIncrement: true }),
  time: int().notNull(),
  text: text().notNull(),
  type: int().notNull().default(0).$type<NoteType>(),
  scope: int().notNull().default(0).$type<NoteScope>(),
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

export type Note = typeof notesT.$inferSelect;
