import { ReactElement, useCallback, useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import movie from "../../assets/image/movie-ticket.jpg";

import { useSignUpStore } from "./Store/signUpStore";
import {
  emailWarning,
  passwordWarning,
  confirmPassWord,
  passwordDoesNotMatch,
  incorrectEmail,
} from "./Utils/warning";
import { useNavigate } from "react-router-dom";

export function SignUp(): ReactElement {
  const [isPassword, setIsPassword] = useState(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);

  const signUp = useSignUpStore(useCallback((state) => state.signUp, []));
  const setSignUp = useSignUpStore(useCallback((state) => state.setSignUp, []));
  const clearSignUp = useSignUpStore(
    useCallback((state) => state.clearSignUp, [])
  );
  const showWarning = useSignUpStore(
    useCallback((state) => state.showWarning, [])
  );
  const navigate = useNavigate();
  const warningType = showWarning(signUp, "confirmPassword");
  const warningEmail = showWarning(signUp, "email");

  function toggleVisibility() {
    setIsPassword(!isPassword);
  }

  function checkDisable() {
    return (
      !signUp?.email?.trim() ||
      !signUp?.password?.trim() ||
      !signUp?.confirmPassword?.trim() ||
      showWarning(signUp, "email") ||
      showWarning(signUp, "password") ||
      showWarning(signUp, "confirmPassword")
    );
  }

  function toggleConfirmVisibility() {
    setIsConfirmPassword(!isConfirmPassword);
  }

  function handleSignUP() {
    let existingSignIn = JSON.parse(
      localStorage.getItem("signUpDetails") || "[]"
    );
    const signInArray = Array.isArray(existingSignIn) ? existingSignIn : [];
    signInArray.push(signUp);
    localStorage.setItem("signUpDetails", JSON.stringify(signInArray));
    clearSignUp();
    navigate("/home");
  }

  function signIn() {
    navigate("/");
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
      <div className="col-span-3 flex flex-col pl-32 pr-32 gap-5 items-center">
        <h1 className="font-semibold text-black flex justify-center pt-32">
          Create Account
        </h1>
        <div className="w-full">
          <input
            type="text"
            placeholder="Email"
            value={signUp?.email}
            className="w-full text-sm text-gray-700 bg-white border border-gray-400 rounded-lg px-4 py-2.5 pr-12 shadow-sm outline-none 
              focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            onChange={(e) => setSignUp("email", e.target.value)}
          />{" "}
          {warningEmail === "empty" && (
            <p className="text-red-500 text-sm">{emailWarning}</p>
          )}
          {warningEmail === "pattern" && (
            <p className="text-red-500 text-sm">{incorrectEmail}</p>
          )}
        </div>
        <div className="relative w-full">
          <input
            id="password"
            placeholder="Password"
            value={signUp?.password}
            type={isPassword ? "text" : "password"}
            className="w-full mt-5 text-sm text-gray-700 bg-white border border-gray-400 rounded-lg px-4 py-2.5 pr-12 shadow-sm outline-none 
      focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            onChange={(e) => setSignUp("password", e.target.value)}
          />
          {showWarning(signUp, "password") && (
            <p className="text-red-500 text-sm pl-1">{passwordWarning}</p>
          )}
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute top-10 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-500 transition-colors"
            aria-label={isPassword ? "Hide password" : "Show password"}
            aria-pressed={isPassword}
            aria-controls="password"
          >
            {isPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        <div className="relative w-full">
          <input
            id="confirmPassword"
            placeholder="Confirm Password"
            value={signUp?.confirmPassword}
            type={isConfirmPassword ? "text" : "password"}
            className="w-full mt-5 text-sm text-gray-700 bg-white border border-gray-400 rounded-lg px-4 py-2.5 pr-12 shadow-sm outline-none 
      focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            onChange={(e) => setSignUp("confirmPassword", e.target.value)}
          />
          {warningType === "empty" && (
            <p className="text-red-500 text-sm">{confirmPassWord}</p>
          )}
          {warningType === "duplicate" && (
            <p className="text-red-500 text-sm">{passwordDoesNotMatch}</p>
          )}
          <button
            type="button"
            onClick={toggleConfirmVisibility}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-500 transition-colors"
            aria-label={isConfirmPassword ? "Hide password" : "Show password"}
            aria-pressed={isConfirmPassword}
            aria-controls="confirmPassword"
          >
            {isConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        <div className="flex flex-col gap-3 mt-3">
          <button
            onClick={handleSignUP}
            className={`bg-red-500 text-white py-1 px-10 rounded-md w-44 ${
              checkDisable() ? "cursor-not-allowed bg-red-300" : null
            }`}
            disabled={checkDisable()}
          >
            Sign in
          </button>
          <button
            className="text-xs hover:underline hover:text-gray-600"
            onClick={signIn}
          >
            Already have an account? Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
