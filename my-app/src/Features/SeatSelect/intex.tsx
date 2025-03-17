import { ReactElement, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { PencilIcon } from "@heroicons/react/24/outline";

import { seatsData } from "../../data";
import { useSelectSeat } from "./Store/intext";

export type Seat = {
  category: string;
  row: string;
  seatNo: number;
  columnNo: number;
};

export function SeatSelect(): ReactElement {
  const location = useLocation();
  const theatre = location.state?.theatre;
  const time = location.state?.time;
  const navigate = useNavigate();
  const seats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [isOpen, setIsOpen] = useState(true);
  const [seatLimit, setSeatLimit] = useState(2);

  const selectedSeats = useSelectSeat(
    useCallback((state) => state.selectedSeats, [])
  );

  const setSelectedSeats = useSelectSeat(
    useCallback((state) => state.setSelectedSeats, [])
  );
  const clearSelectedSeats = useSelectSeat(
    useCallback((state) => state.selectedSeats, [])
  );
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function seatCount(seat: number) {
    setSeatLimit(seat);
  }

  const allRows = Array.from(
    new Set(
      seatsData.sections.flatMap((section) =>
        section.seats.map((seat) => seat.row)
      )
    )
  ).sort();

  function getSeatsForRow(sectionName: string, row: string): Seat[] {
    const section = seatsData.sections.find((sec) => sec.name === sectionName);
    if (!section) return [];
    return section.seats
      .filter((seat) => seat.row === row)
      .sort((a, b) => a.seatNo - b.seatNo);
  }

  useEffect(() => {
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
  }, [selectedSeats]);

  function handleSeatClick(row: string, seatNo: number) {
    const seatKey = `${row}-${seatNo}`;
    setSelectedSeats(seatKey, seatLimit);
  }

  function navigateConfirmBooking() {
    const movieData = JSON.parse(localStorage.getItem("Movie") || "{}");
    const movieDetails = {
      movie: movieData.movie,
      seats: selectedSeats,
      theatre: theatre.Theatre,
      time: time.time,
      seatCount: seatLimit,
    };
    localStorage.setItem("movieDetails", JSON.stringify(movieDetails));
    navigate("/confirmBooking");
  }

  return (
    <div className="w-full p-14">
      <div className="flex items-center justify-between">
        <div>
          {theatre.Theatre}
          {time.time}
        </div>
        <div className="flex gap-3 items-center">
          <Button
            onClick={open}
            className="flex items-center gap-1 text-red-500"
          >
            <PencilIcon className="h-4" />
            <span className="text-sm">{seatLimit} Tickets</span>
          </Button>
          {selectedSeats.length === seatLimit ? (
            <button
              className="bg-red-500 text-white py-1 px-14 rounded-md"
              onClick={navigateConfirmBooking}
            >
              Rs.{seatLimit * 240} Pay
            </button>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col space-y-4 p-4">
        {allRows.map((row) => {
          const leftSeats = getSeatsForRow("Left", row);
          const rightSeats = getSeatsForRow("Right", row);
          return (
            <div
              key={row}
              className="flex items-center space-x-4 justify-center"
            >
              <div
                className={`w-6 font-semibold text-gray-500 ${
                  row === "B" ? "mb-6" : ""
                }`}
              >
                {row}
              </div>
              <div className="flex space-x-2">
                {leftSeats.map((seat) => (
                  <button
                    key={`${row}-${seat.seatNo}`}
                    className={`w-8 h-8 rounded border border-green-600 font-semibold hover:bg-green-600 hover:text-white flex items-center justify-center   ${
                      seat.row === "B" ? "mb-6" : ""
                    } ${
                      selectedSeats.includes(`${row}-${seat.seatNo}`)
                        ? "bg-green-600 text-white"
                        : "text-green-600 bg-white"
                    } `}
                    onClick={() => handleSeatClick(row, seat.seatNo)}
                  >
                    {seat.seatNo}
                  </button>
                ))}
              </div>
              <div className="w-12" />
              <div className="flex space-x-2">
                {rightSeats.map((seat) => (
                  <button
                    key={`${row}-${seat.seatNo}`}
                    className={`w-8 h-8 rounded border border-green-600 font-semibold hover:bg-green-600 hover:text-white flex items-center justify-center   ${
                      seat.row === "B" ? "mb-6" : ""
                    } ${
                      selectedSeats.includes(`${row}-${seat.seatNo}`)
                        ? "bg-green-600 text-white"
                        : "text-green-600 bg-white"
                    } `}
                    onClick={() => handleSeatClick(row, seat.seatNo)}
                  >
                    {seat.seatNo}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 items-center text-xs">
        <div className="flex gap-1">
          <div className="w-4 h-4 rounded border border-green-600 bg-white font-semibold flex items-center justify-center " />
          <p>Available</p>
        </div>
        <div className="flex gap-1">
          <div className="w-4 h-4 rounded border border-green-600 font-semibold bg-green-600 flex items-center justify-center " />
          <p>Selected</p>
        </div>
        <div className="flex gap-1">
          <div className="w-4 h-4 rounded border border-gray-300 font-semibold bg-gray-300  flex items-center justify-center " />
          <p>Sold</p>
        </div>
      </div>
      <div className="w-full flex justify-center items-end">
        <div className="h-2 w-96 bg-sky-100" />
      </div>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 w-screen">
          <div className="flex min-h-full items-start justify-center mt-32">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-md bg-white  backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="font-semibold text-black flex justify-center p-6"
              >
                How Many Seats?
              </DialogTitle>
              <div className="border-b-2 h-20 flex items-center px-5">
                {seats.map((item) => (
                  <button
                    className={`rounded-full w-10 h-10 ${
                      seatLimit === item
                        ? "bg-red-500 text-white "
                        : "text-black"
                    }`}
                    onClick={() => seatCount(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex flex-col items-center justify-center gap-3 pb-6">
                <div className="flex gap-7">
                  <div className="flex flex-col items-center justify-center">
                    <p className="font-semibold">Rs.240</p>
                    <p className="text-green-600">Available</p>
                  </div>
                </div>
                <Button
                  onClick={close}
                  className="bg-red-500 text-white py-1 px-24 rounded-md"
                >
                  Select Seats
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
