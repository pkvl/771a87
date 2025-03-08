import { create } from "zustand";

type DialogType = "DRAWER" | "DIALOG";

type DialogStore = {
  openDialogs: Record<string, Set<DialogType>>; // Store both types per ID
  openDialog: (id: string, type: DialogType) => void;
  closeDialog: (id: string, type: DialogType) => void;
  isOpen: (id: string, type: DialogType) => boolean;
};

export const useDialogStore = create<DialogStore>((set, get) => ({
  openDialogs: {},

  openDialog: (id, type) =>
    set((state) => ({
      openDialogs: {
        ...state.openDialogs,
        [id]: new Set([...(state.openDialogs[id] ?? []), type]),
      },
    })),

  closeDialog: (id, type) =>
    set((state) => {
      const newDialogs = { ...state.openDialogs };
      newDialogs[id]?.delete(type);

      if (newDialogs[id]?.size === 0) {
        delete newDialogs[id]; // Remove ID if no types remain
      }

      return { openDialogs: newDialogs };
    }),

  isOpen: (id, type) => get().openDialogs[id]?.has(type) ?? false,
}));
