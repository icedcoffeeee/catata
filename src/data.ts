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
  subnoteIDs: number[];
}

export const getNotes: () => Note[] = () => [
  {
    id: 1,
    text: "Day Note",
    time: new Date(2025, 2, 3).getTime(),
    scope: NoteScope.DAY,
    type: NoteType.NOTE,
    subnoteIDs: [2, 4],
  },
  {
    id: 2,
    text: "Sub Note",
    time: new Date(2025, 2, 3).getTime(),
    scope: NoteScope.DAY,
    type: NoteType.TODO,
    subnoteIDs: [3],
  },
  {
    id: 3,
    text: "Sub Sub Note",
    time: new Date(2025, 2, 3).getTime(),
    scope: NoteScope.DAY,
    type: NoteType.DONE,
    subnoteIDs: [],
  },
  {
    id: 4,
    text: "Long Long Long Long Long Long Long Long Long Long Long Sub Note",
    time: new Date(2025, 2, 3).getTime(),
    scope: NoteScope.DAY,
    type: NoteType.NOTE,
    subnoteIDs: [],
  },
  {
    id: 5,
    text: "Month Note",
    time: new Date(2025, 2, 1).getTime(),
    scope: NoteScope.MONTH,
    type: NoteType.NOTE,
    subnoteIDs: [],
  },
  {
    id: 6,
    text: "Year Note",
    time: new Date(2025, 5, 15).getTime(),
    scope: NoteScope.YEAR,
    type: NoteType.NOTE,
    subnoteIDs: [],
  },
  {
    id: 7,
    text: "Year Note",
    time: new Date(2025, 1, 3).getTime(),
    scope: NoteScope.YEAR,
    type: NoteType.TODO,
    subnoteIDs: [],
  },
];
