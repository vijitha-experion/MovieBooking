import { ReactElement } from "react";

export function Header(): ReactElement {
  return (
    <div className="h-16 w-full bg-slate-100 flex items-center pl-20">
      <h1 className="text-red-500 text-semibold">Movie Time</h1>
    </div>
  );
}
