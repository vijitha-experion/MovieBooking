import { ReactElement } from "react";

export function Header(): ReactElement {
  return (
    <div className="h-16 flex items-center justify-between">
      <h1 className="text-red-500 font-semibold text-lg pl-20">Movie Time</h1>
      <button className="bg-red-500 px-3 py-1 rounded-md text-white mr-20">
        Sign in
      </button>
    </div>
  );
}
