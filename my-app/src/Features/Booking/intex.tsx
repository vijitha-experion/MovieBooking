import { ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { Theatre } from "../../data";
import { times } from "../../data";

export function Booking(): ReactElement {
  const location = useLocation();
  const movie = location.state?.movie;
  const navigate = useNavigate();
  function seatSelect() {
    navigate("/seatSelect");
  }

  return (
    <>
      <h2>Booking for: {movie?.image}</h2>
      <p>Rating: {movie?.rating}</p>
      <p>Votes: {movie?.votes}</p>
      <div className="flex">
        {[...Array(5)].map((_, index) => {
          const futureDate = dayjs().add(index, "day");
          return (
            <div key={index}>
              <p>Day: {futureDate.format("dddd")}</p>
              <p>Date: {futureDate.format("D")}</p>
              <p>Month: {futureDate.format("MMMM")}</p>
              <hr />
            </div>
          );
        })}
      </div>
      {Theatre.map((item) => (
        <div className="w-full h-32 flex" key={item.id}>
          <p>
            {item.Theatre}:{item.location}
          </p>
          {times.map((data) => (
            <div
              className="border-2 w-32 h-16"
              key={data.id}
              onClick={seatSelect}
            >
              <p>{data.time}</p>
              <p>{data.type}</p>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
