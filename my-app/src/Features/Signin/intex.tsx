import { ReactElement, useCallback, useState } from "react";

import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Eye, EyeOff } from "lucide-react";

import { useSignInStore } from "./Store/signInStore";
import { emailWarning, passwordWarning } from "./Utils/warning";

export function Signin({ isOpen, close }: any): ReactElement {
  const [isVisible, setIsVisible] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const signIn = useSignInStore(useCallback((state) => state.signIn, []));
  const setSignIn = useSignInStore(useCallback((state) => state.setSignIn, []));
  const clearSignIn = useSignInStore(
    useCallback((state) => state.clearSignIn, [])
  );
  const showWarning = useSignInStore(
    useCallback((state) => state.showWarning, [])
  );

  function toggleVisibility() {
    setIsVisible(!isVisible);
  }

  function signUp() {
    setIsSignUp(true);
  }

  function handleSignIn() {
    let existingSignIn = JSON.parse(
      localStorage.getItem("signInDetails") || "[]"
    );
    const signInArray = Array.isArray(existingSignIn) ? existingSignIn : [];
    signInArray.push(signIn);
    localStorage.setItem("signInDetails", JSON.stringify(signInArray));
    clearSignIn();
    close();
  }

  function checkDisable() {
    return (
      !signIn?.email?.trim() ||
      !signIn?.password?.trim() ||
      showWarning(signIn, "email") ||
      showWarning(signIn, "password")
    );
  }

  return (
    <div>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 w-screen">
          <div className="flex min-h-full items-start justify-center mt-32">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-md bg-white  backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="font-semibold text-black flex justify-center p-6"
              >
                Sign In
              </DialogTitle>
              <div className="flex flex-col p-6 border boder-b border-gray-300">
                <input
                  type="text"
                  placeholder="Email"
                  value={signIn?.email}
                  className="w-full text-sm text-gray-700 bg-white border border-gray-400 rounded-lg px-4 py-2.5 pr-12 shadow-sm outline-none 
              focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                  onChange={(e) => setSignIn("email", e.target.value)}
                />{" "}
                {showWarning(signIn, "email") && (
                  <p className="text-red-500 text-sm pl-1">{emailWarning}</p>
                )}
                <input
                  id="password"
                  placeholder="Password"
                  value={signIn?.password}
                  type={isVisible ? "text" : "password"}
                  className="w-full mt-5 text-sm text-gray-700 bg-white border border-gray-400 rounded-lg px-4 py-2.5 pr-12 shadow-sm outline-none 
              focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                  onChange={(e) => setSignIn("password", e.target.value)}
                />
                {showWarning(signIn, "password") && (
                  <p className="text-red-500 text-sm pl-1">{passwordWarning}</p>
                )}
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="absolute inset-y-3 right-11 mt-9 flex items-center text-gray-400 hover:text-gray-500 transition-colors"
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  aria-pressed={isVisible}
                  aria-controls="password"
                >
                  {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              <div className="flex flex-col justify-center p-6 gap-5">
                <Button
                  onClick={handleSignIn}
                  className={`bg-red-500 text-white py-1 px-10 rounded-md ${
                    checkDisable() ? "cursor-not-allowed bg-red-300" : null
                  }`}
                  disabled={checkDisable()}
                >
                  Sign in
                </Button>
                <button
                  className="text-xs hover:underline hover:text-gray-500"
                  onClick={signUp}
                >
                  Not a member yet? Sign Up
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      {}
    </div>
  );
}
