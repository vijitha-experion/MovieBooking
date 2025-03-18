import { create } from "zustand";
import { produce } from "immer";
import { userType } from "../Types/userType";
import { emailPattern, phonePattern } from "../Utils/warning";
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
  showWarning(user: userType, field: string) {
    const { isTouchfield } = get();
    if (!isTouchfield[field]) return false;

    if (field === "email") {
      if (!emailPattern.test(user?.email?.toString())) {
        return "pattern";
      }
      if (!user?.email?.trim()) return "empty";
    }

    if (field === "phone") {
      if (!phonePattern.test(user?.phone?.toString())) {
        return "pattern";
      }
      if (!user?.phone) return "empty";
    }
  },
}));
