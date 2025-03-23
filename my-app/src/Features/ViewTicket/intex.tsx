import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

export function ViewTicket(): ReactElement {
  const Movie = JSON.parse(localStorage.getItem("Movie") || "{}");
  const movieDetails = JSON.parse(localStorage.getItem("movieDetails") || "{}");
  const date = JSON.parse(localStorage.getItem("date") || "");
  const navigate = useNavigate();

  function backToHome() {
    navigate("/");
    localStorage.removeItem("date");
  }
  return (
    <div className="flex flex-col items-center gap-7">
      <div className="flex items-end gap-40 mt-14">
        <div className="flex flex-col justify-center gap-5 bg-white p-5 rounded-lg">
          <p className="font-semibold text-lg">Your Ticket</p>
          <img
            src={require(`../../assets/image/${Movie.image}.jpg`)}
            alt="img"
            className="w-56 h-72 rounded-lg"
          />{" "}
          <div className="flex flex-col gap-2 text-slate-700">
            <p className="text-black font-semibold">{Movie?.movie}</p>
            <p className="font-semibold">{movieDetails?.seatCount} Tickets</p>
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
        <button
          className="border border-gray-700 text-gray-600 py-2 px-14 rounded-md h-10"
          onClick={backToHome}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
