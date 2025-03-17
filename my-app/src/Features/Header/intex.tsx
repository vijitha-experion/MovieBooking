import { ReactElement, useCallback, useState } from "react";
import { Signin } from "../Signin/intex";
import { useSignInStore } from "../Signin/Store/signInStore";

export function Header(): ReactElement {
  const [isOpen, isSetIsOpen] = useState(false);

  const clearSignIn = useSignInStore(
    useCallback((state) => state.clearSignIn, [])
  );

  function signIn() {
    clearSignIn();
    isSetIsOpen(true);
  }

  function close() {
    clearSignIn();
    isSetIsOpen(false);
  }
  return (
    <div className="h-14 flex items-center justify-between shadow-xl bg-white">
      <h1 className="text-red-500 font-extrabold text-lg pl-14">Movie Time</h1>
      <button
        className="bg-red-500 px-3 py-1 rounded-md text-white mr-14"
        onClick={signIn}
      >
        Sign in
      </button>
      {isOpen ? <Signin isOpen={isOpen} close={close} /> : null}
    </div>
  );
}
