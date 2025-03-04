import { create } from "zustand";
import { Note, NoteScope, NoteType } from "./db";

type Modal = {
  modal: boolean;

  id?: number;
  text: string;
  time: number;
  scope: NoteScope;
  type: NoteType;
  parentID?: number;
  parent?: Note;

  open: (note?: Partial<Omit<Note, "parentID">>) => void;
  openE: (note?: Pick<Note, "time" | "scope">) => void;
  close: () => void;
  set: (
    note: Partial<Omit<Note, "parentID"> & { parentID: number; parent: Note }>,
  ) => void;
  reset: () => void;
};

const initial = {
  modal: false,

  id: undefined,
  text: "",
  time: new Date().getTime(),
  scope: NoteScope.DAY,
  type: NoteType.NOTE,

  parentID: undefined,
  parent: undefined,
};

export const useModal = create<Modal>((set, get) => ({
  ...initial,

  open: (note) => set({ modal: true, ...note }),
  openE: (note) => {
    get().reset();
    get().open(note);
  },
  close: () => set({ modal: false }),
  set: (note) => set({ ...note }),
  reset: () => set({ ...initial }),
}));
