import { create } from "zustand";
import { Note, NoteScope, NoteType } from "./data";

type Modal = {
  modal: boolean;

  text: string;
  time: number;
  scope: NoteScope;
  type: NoteType;

  open: (note?: Note) => void;
  openE: (note?: Pick<Note, "time" | "scope">) => void;
  close: () => void;
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
    set({ ...initial });
    set({ modal: true, ...note });
  },
  close: () => set({ modal: false }),
  set: (note: Partial<Note>) => set({ ...note }),
}));
