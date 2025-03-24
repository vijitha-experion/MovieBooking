import { ReactElement, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Eye, EyeOff } from "lucide-react";

import movie from "../../assets/image/movie-ticket.jpg";
import { SignUpType } from "../SignUp/Types/signUpType";

import { useSignInStore } from "./Store/signInStore";
import { emailWarning, passwordWarning } from "./Utils/warning";

export function Signin(): ReactElement {
  const [isVisible, setIsVisible] = useState(false);

  const signIn = useSignInStore(useCallback((state) => state.signIn, []));
  const setSignIn = useSignInStore(useCallback((state) => state.setSignIn, []));
  const clearSignIn = useSignInStore(
    useCallback((state) => state.clearSignIn, [])
  );
  const showWarning = useSignInStore(
    useCallback((state) => state.showWarning, [])
  );
  const navigate = useNavigate();
  function toggleVisibility() {
    setIsVisible(!isVisible);
  }

  function signUp() {
    navigate("/signUp");
  }

  function handleSignIn() {
    let existingSignUp = JSON.parse(
      localStorage.getItem("signUpDetails") || "[]"
    );
    const signInArray = [];
    signInArray.push(signIn);
    if (
      existingSignUp.filter(
        (item: SignUpType) =>
          item.email === signIn.email && item.password === signIn.password
      )
    ) {
      localStorage.setItem("signUpDetails", JSON.stringify(signInArray));
      navigate("/home");
    } else {
      console.log("Error");
    }
    clearSignIn();
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
    <div className="grid grid-cols-7">
      <div className="col-span-4">
        <div
          style={{
            backgroundImage: `url(${movie})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="col-span-1 h-screen flex items-end"
        />
      </div>
      <div className="col-span-3 flex flex-col pl-32 pr-32 gap-10 items-center">
        <h1 className="font-semibold text-black flex justify-center pt-32">
          Sign In
        </h1>
        <div className="w-full">
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
        </div>
        <div className="w-full">
          <input
            id="password"
            placeholder="Password"
            value={signIn?.password}
            type={isVisible ? "text" : "password"}
            className="w-full text-sm text-gray-700 bg-white border border-gray-400 rounded-lg px-4 py-2.5 pr-12 shadow-sm outline-none 
              focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            onChange={(e) => setSignIn("password", e.target.value)}
          />
          {showWarning(signIn, "password") && (
            <p className="text-red-500 text-sm pl-1">{passwordWarning}</p>
          )}
        </div>
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute inset-y-3 -mt-24 right-36 flex items-center text-gray-400 hover:text-gray-500 transition-colors"
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
          aria-controls="password"
        >
          {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleSignIn}
            className={`bg-red-500 text-white py-1 px-10 rounded-md w-44 ${
              checkDisable() ? "cursor-not-allowed bg-red-300" : null
            }`}
            disabled={checkDisable()}
          >
            Sign in
          </button>
          <button
            className="text-xs hover:underline hover:text-gray-600"
            onClick={signUp}
          >
            Not a member yet? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
