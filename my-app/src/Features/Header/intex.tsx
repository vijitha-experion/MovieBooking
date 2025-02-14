import { ReactElement } from "react";

export function Header(): ReactElement {
  return (
    <div className="h-14 flex items-center justify-between shadow-xl">
      <h1 className="text-red-500 font-extrabold text-lg pl-14">Movie Time</h1>
      <button className="bg-red-500 px-3 py-1 rounded-md text-white mr-14">
        Sign in
      </button>
    </div>
  );
}
