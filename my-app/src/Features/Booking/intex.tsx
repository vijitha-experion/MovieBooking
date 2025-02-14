import { ReactElement, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { StarIcon } from "@heroicons/react/16/solid";

import { Theatre } from "../../data";
import { times } from "../../data";
import { Theatres } from "./types/theatre";
import { Times } from "./types/theatre";

export function Booking(): ReactElement {
  const location = useLocation();
  const movie = location.state?.movie;
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(0);

  function seatSelect(item: Theatres, data: Times) {
    navigate("/seatSelect", { state: { theatre: item, time: data } });
  }

  function selectDay(index: number) {
    setSelectedIndex(index);
  }

  return (
    <div className="pl-14 mr-14">
      <div className="h-20 w-full flex items-center border-b-2 gap-5 font-semibold">
        <h2 className="text-2xl">{movie?.movie}</h2>
        <p className="flex gap-1 items-center">
          {" "}
          <StarIcon className="h-5 w-5 fill-red-500" />
          {movie?.rating}
        </p>
        <p>{movie?.votes} Votes</p>
      </div>
      <div className="flex py-3 gap-5 h-20 border-b-2">
        {[...Array(5)].map((_, index) => {
          const futureDate = dayjs().add(index, "day");
          return (
            <div
              key={index}
              className={`rounded-lg text-xs px-3 py-1 font-semibold cursor-pointer ${
                selectedIndex === index ? "bg-red-500 text-white" : "text-black"
              }`}
              onClick={() => selectDay(index)}
            >
              <p className="flex justify-center">{futureDate.format("dddd")}</p>
              <p className="flex justify-center">{futureDate.format("D")}</p>
              <p className="flex justify-center">{futureDate.format("MMMM")}</p>
            </div>
          );
        })}
      </div>
      {Theatre.map((item) => (
        <div
          className="w-full h-32 flex border-b-2 items-center justify-between"
          key={item.id}
        >
          <p className="w-80 font-semibold">
            {item.Theatre}: {item.location}
          </p>
          {times.map((data) => (
            <div
              className="border-2 border-gray-300 w-32 px-2 py-2 rounded-md text-xs cursor-pointer"
              key={data.id}
              onClick={() => seatSelect(item, data)}
            >
              <p className="flex justify-center items-center text-green-600">
                {data.time}
              </p>
              <p className="flex justify-center items-center">{data.type}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
