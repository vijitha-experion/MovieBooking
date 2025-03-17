import { create } from "zustand";
import { produce } from "immer";
export const useUserStore = create<any>()((set, get) => ({
  user: {},
  isTouchfield: {},
  setUser: (key: string, value: any) => {
    set(
      produce((state: any) => {
        state.user = { ...get().user, [key]: value };
        state.isTouchfield[key] = true;
      })
    );
  },
  clearUser() {
    set(
      produce((state: any) => {
        state.user = {};
        state.isTouchfield = {};
      })
    );
  },
}));
