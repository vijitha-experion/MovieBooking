import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

import { movies } from "../../data";

import { MovieItem } from "./types/type";
export function Home(): ReactElement {
  const navigate = useNavigate();

  function goToBooking(item: MovieItem) {
    navigate("/booking", { state: { movie: item } });
  }

  return (
    <div className="flex flex-wrap pl-16">
      {movies.map((item) => (
        <div
          key={item.id}
          className="bg-slate-100 w-48 m-5"
          onClick={() => goToBooking(item)}
        >
          <img
            src={require(`../../assets/image/${item.image}.jpg`)}
            alt="img"
            className="w-48 h-64"
          />
          <div className="flex justify-between pl-3 pr-3 p-2 rounded-b-lg">
            <p>{item.rating}</p>
            <p>{item.votes} Votes</p>
          </div>
        </div>
      ))}
    </div>
  );
}
