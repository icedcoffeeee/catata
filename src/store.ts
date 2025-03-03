import { create } from "zustand";
import { Note, NoteScope, NoteType } from "./db";

type Modal = {
  modal: boolean;

  id?: number;
  text: string;
  time: number;
  scope: NoteScope;
  type: NoteType;

  open: (note?: Note) => void;
  openE: (note?: Pick<Note, "time" | "scope">) => void;
  close: () => void;
  reset: () => void;
  set: (note: Partial<Note>) => void;
};

const initial = {
  modal: false,
  text: "",
  time: new Date().getTime(),
  scope: NoteScope.DAY,
  type: NoteType.NOTE,
};

export const useModal = create<Modal>((set) => ({
  ...initial,

  open: (note) => set({ modal: true, ...note }),
  openE: (note) => {
    set({ id: undefined, ...initial });
    set({ modal: true, ...note });
  },
  close: () => set({ modal: false }),
  reset: () => set({ id: undefined, ...initial }),
  set: (note: Partial<Note>) => set({ ...note }),
}));
