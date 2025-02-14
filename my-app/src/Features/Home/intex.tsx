import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

import { StarIcon } from "@heroicons/react/16/solid";

import { movies } from "../../data";

import { MovieItem } from "./types/movie";
export function Home(): ReactElement {
  const navigate = useNavigate();

  function goToBooking(item: MovieItem) {
    navigate("/booking", { state: { movie: item } });
  }

  return (
    <div className="flex flex-wrap pl-10 pt-7">
      {movies.map((item) => (
        <div
          key={item.id}
          className="w-52 m-4 rounded-lg shadow-md cursor-pointer"
          onClick={() => goToBooking(item)}
        >
          <img
            src={require(`../../assets/image/${item.image}.jpg`)}
            alt="img"
            className="w-64 h-80 rounded-t-lg"
          />
          <div className="flex justify-between pl-3 pr-3 p-2 text-sm font-semibold">
            <p className="flex gap-1">
              <StarIcon className="h-5 w-5 fill-red-500" />
              {item.rating}
            </p>
            <p>{item.votes} Votes</p>
          </div>
        </div>
      ))}
    </div>
  );
}
