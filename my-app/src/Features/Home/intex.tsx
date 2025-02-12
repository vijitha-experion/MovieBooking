import React, { ReactElement } from "react";
import rabit from "../../assets/image/rabit.jpg";

export function Home(): ReactElement {
  return (
    <div className="">
      <div>sdjxjshchdj hhdv hh</div>
      <div>
        <img src={rabit} alt="img" />
        <p>rating 8.5</p>
      </div>
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <h1 className="text-4xl font-bold text-blue-500">
          Hello, Tailwind CSS! 🎉
        </h1>
      </div>
    </div>
  );
}
