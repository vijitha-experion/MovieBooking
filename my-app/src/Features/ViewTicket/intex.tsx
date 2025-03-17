import { ReactElement } from "react";

export function ViewTicket(): ReactElement {
  const Movie = JSON.parse(localStorage.getItem("Movie") || "{}");
  const movieDetails = JSON.parse(localStorage.getItem("movieDetails") || "{}");
  const date = JSON.parse(localStorage.getItem("date") || "");

  return (
    <div className="flex flex-col items-center pt-20">
      <p className="font-semibold pb-10 text-lg">Your Ticket</p>
      <div className="flex justify-center gap-5 bg-white p-5 rounded-lg">
        <img
          src={require(`../../assets/image/${Movie.image}.jpg`)}
          alt="img"
          className="w-48 h-60 rounded-lg"
        />{" "}
        <div className="flex flex-col gap-2 text-slate-700">
          <p className="text-slate-900 font-semibold">{Movie?.movie}</p>
          <p>{movieDetails?.seatCount} Tickets</p>
          <p>{movieDetails?.theatre}</p>
          <p>{date}</p>
          <p>{movieDetails.time}</p>
          <div className="flex gap-3">
            <p>Seats:</p>
            {movieDetails.seats.map((item: any) => (
              <p>{item}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
