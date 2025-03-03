import { create } from "zustand";
import { Note } from "./data";

type Modal = {
  modal: boolean;
  note?: Note;
  newTime?: number;
  open: (noteXtime?: Note | number) => void;
  close: () => void;
};

export const useModal = create<Modal>((set) => ({
  modal: false,
  note: undefined,
  newTime: undefined,
  open: (noteXtime) =>
    set({
      modal: true,
      note: typeof noteXtime === "object" ? noteXtime : undefined,
      newTime: typeof noteXtime !== "object" ? noteXtime : undefined,
    }),
  close: () => set({ modal: false }),
}));
