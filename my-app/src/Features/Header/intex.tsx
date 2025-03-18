import { ReactElement } from "react";

export function Header(): ReactElement {
  return (
    <div className="h-14 flex items-center justify-between shadow-xl bg-white">
      <h1 className="text-red-500 font-extrabold text-lg pl-14">Movie Time</h1>
    </div>
  );
}
