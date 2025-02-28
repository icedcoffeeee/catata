export enum NoteType {
  DAY,
  MONTH,
  YEAR,
}
export interface Note {
  id: number;
  text: string;
  epoch: number;
  type: NoteType;
  subnoteIDs: number[];
}

export const getNotes: () => Note[] = () => [
  {
    id: 1,
    text: "Day Note",
    epoch: new Date().getTime(),
    type: NoteType.DAY,
    subnoteIDs: [2, 4],
  },
  {
    id: 2,
    text: "Sub Note",
    epoch: new Date().getTime(),
    type: NoteType.DAY,
    subnoteIDs: [3],
  },
  {
    id: 3,
    text: "Sub Sub Note",
    epoch: new Date().getTime(),
    type: NoteType.DAY,
    subnoteIDs: [],
  },
  {
    id: 4,
    text: "Sub Note",
    epoch: new Date().getTime(),
    type: NoteType.DAY,
    subnoteIDs: [],
  },
  {
    id: 5,
    text: "Month Note",
    epoch: new Date().getTime(),
    type: NoteType.MONTH,
    subnoteIDs: [],
  },
  {
    id: 6,
    text: "Year Note",
    epoch: new Date().getTime(),
    type: NoteType.YEAR,
    subnoteIDs: [],
  },
];
