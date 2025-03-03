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
export interface Note {
  id: number;
  text: string;
  time: number;
  scope: NoteScope;
  type: NoteType;
  parentID?: number;
}

export const getNotes: () => Note[] = () => [
  {
    id: 1,
    text: "Day Note",
    time: new Date().getTime(),
    scope: NoteScope.DAY,
    type: NoteType.NOTE,
  },
  {
    id: 2,
    text: "Sub Note",
    time: new Date().getTime(),
    scope: NoteScope.DAY,
    type: NoteType.TODO,
    parentID: 1,
  },
  {
    id: 3,
    text: "Sub Sub Note",
    time: new Date().getTime(),
    scope: NoteScope.DAY,
    type: NoteType.DONE,
    parentID: 2,
  },
  {
    id: 4,
    text: "Long Long Long Long Long Long Long Long Long Long Long Sub Note",
    time: new Date().getTime(),
    scope: NoteScope.DAY,
    type: NoteType.NOTE,
    parentID: 1,
  },
  {
    id: 5,
    text: "Month Note",
    time: new Date().getTime(),
    scope: NoteScope.MONTH,
    type: NoteType.NOTE,
  },
  {
    id: 6,
    text: "Month Note",
    time: new Date(2025, 2, 1).getTime(),
    scope: NoteScope.MONTH,
    type: NoteType.NOTE,
  },
  {
    id: 7,
    text: "Year Note",
    time: new Date().getTime(),
    scope: NoteScope.YEAR,
    type: NoteType.NOTE,
  },
  {
    id: 8,
    text: "Year Note",
    time: new Date(2025, 5, 15).getTime(),
    scope: NoteScope.YEAR,
    type: NoteType.TODO,
  },
];
