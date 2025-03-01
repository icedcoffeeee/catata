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
  epoch: number;
  scope: NoteScope;
  type: NoteType;
  subnoteIDs: number[];
}

export const getNotes: () => Note[] = () => [
  {
    id: 1,
    text: "Day Note",
    epoch: new Date().getTime(),
    scope: NoteScope.DAY,
    type: NoteType.NOTE,
    subnoteIDs: [2, 4],
  },
  {
    id: 2,
    text: "Sub Note",
    epoch: new Date().getTime(),
    scope: NoteScope.DAY,
    type: NoteType.TODO,
    subnoteIDs: [3],
  },
  {
    id: 3,
    text: "Sub Sub Note",
    epoch: new Date().getTime(),
    scope: NoteScope.DAY,
    type: NoteType.DONE,
    subnoteIDs: [],
  },
  {
    id: 4,
    text: "Long Long Long Long Long Long Long Long Long Long Long Sub Note",
    epoch: new Date().getTime(),
    scope: NoteScope.DAY,
    type: NoteType.NOTE,
    subnoteIDs: [],
  },
  {
    id: 5,
    text: "Month Note",
    epoch: new Date().getTime(),
    scope: NoteScope.MONTH,
    type: NoteType.NOTE,
    subnoteIDs: [],
  },
  {
    id: 6,
    text: "Year Note",
    epoch: new Date().getTime(),
    scope: NoteScope.YEAR,
    type: NoteType.NOTE,
    subnoteIDs: [],
  },
  {
    id: 7,
    text: "Year Note",
    epoch: new Date().getTime(),
    scope: NoteScope.YEAR,
    type: NoteType.TODO,
    subnoteIDs: [],
  },
];
