import { create } from "zustand";
import { Note, NoteScope } from "./data";

type New = { time?: number; scope?: NoteScope };

type Modal = {
  modal: boolean;
  note?: Note;
  empty?: New;
  open: (note?: Note) => void;
  openE: (note?: New) => void;
  close: () => void;
};

export const useModal = create<Modal>((set) => ({
  modal: false,
  note: undefined,
  newTime: undefined,
  open: (note) => set({ modal: true, note }),
  openE: (note) => set({ modal: true, note: undefined, empty: note }),
  close: () => set({ modal: false }),
}));
