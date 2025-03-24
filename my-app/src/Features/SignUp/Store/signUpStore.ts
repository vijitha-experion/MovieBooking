import { create } from "zustand";
import { produce } from "immer";
import { SignUpType } from "../Types/signUpType";
import { emailPattern } from "../Utils/warning";

export const useSignUpStore = create<any>()((set, get) => ({
  signUp: {},
  isTouchfield: {},
  setSignUp: (key: string, value: any) => {
    set(
      produce((state: any) => {
        state.signUp = { ...get().signUp, [key]: value };
        state.isTouchfield[key] = true;
      })
    );
  },
  clearSignUp() {
    set(
      produce((state: any) => {
        state.signUp = {};
        state.isTouchfield = {};
      })
    );
  },

  showWarning(sigUp: SignUpType, field: string): string | boolean {
    const { isTouchfield } = get();
    if (!isTouchfield[field]) return false;

    if (field === "email") {
      if (!emailPattern.test(sigUp?.email?.toString())) {
        return "pattern";
      }
      if (!sigUp?.email?.trim()) return "empty";
    }
    if (field === "password") return !sigUp?.password?.trim() ? true : false;
    if (field === "confirmPassword") {
      if (!sigUp?.confirmPassword) return "empty";

      const isDuplicate = sigUp?.password !== sigUp?.confirmPassword;
      if (isDuplicate) return "duplicate";
    }
    return false;
  },
}));
