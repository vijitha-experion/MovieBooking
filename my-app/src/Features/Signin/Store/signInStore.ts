import { create } from "zustand";
import { produce } from "immer";
import { signInType } from "../Types/signInType";

export const useSignInStore = create<any>()((set, get) => ({
  signIn: {},
  isTouchfield: {},
  setSignIn: (key: string, value: any) => {
    set(
      produce((state: any) => {
        state.signIn = { ...get().signIn, [key]: value };
        state.isTouchfield[key] = true;
      })
    );
  },
  clearSignIn() {
    set(
      produce((state: any) => {
        state.signIn = {};
        state.isTouchfield = {};
      })
    );
  },

  showWarning(sigIn: signInType, field: string): string | boolean {
    const { isTouchfield } = get();
    if (!isTouchfield[field]) return false;

    if (field === "email") return !sigIn?.email?.trim() ? true : false;
    if (field === "password") return !sigIn?.password?.trim() ? true : false;

    return false;
  },
}));
