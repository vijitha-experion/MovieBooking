import { ReactElement, useCallback, useState } from "react";

import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import { useUserStore } from "./Store/userStore";

export function ConfirmBooking(): ReactElement {
  const user = useUserStore(useCallback((state) => state.user, []));
  const setUser = useUserStore(useCallback((state) => state.setUser, []));
  const clearUser = useUserStore(useCallback((state) => state.clearUser, []));
  const movieData = JSON.parse(localStorage.getItem("movieDetails") || "{}");
  const movie = JSON.parse(localStorage.getItem("Movie") || "{}");

  const [isOpen, setIsOpen] = useState(false);
  function onSubmit() {}

  function onPayment() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  return (
    <div className="pl-14 grid grid-cols-5 mt-14">
      <div className="h-36 bg-white col-span-3">
        <div className="bg-red-500 text-white font-semibold pl-4 p-3 h-12">
          <p>Share your Contact Details</p>
        </div>
        <div className="flex items-center h-24 gap-3 pl-4">
          <input
            type="text"
            placeholder="Email"
            className="w-72 text-sm text-gray-700 bg-white border border-gray-400 rounded-lg px-4 py-2.5 pr-12 shadow-sm outline-none 
              focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            className="w-72 text-sm text-gray-700 bg-white border border-gray-400 rounded-lg px-4 py-2.5 pr-12 shadow-sm outline-none 
              focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            onChange={(e) => setUser(e.target.value)}
          />
          <button
            className="bg-red-500 text-white py-2 px-14 rounded-md"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
        <div className="bg-white mt-10">
          <div className="bg-red-500 text-white font-semibold pl-4 p-3 h-12">
            <p>Payment methods</p>
          </div>
          <div className="flex justify-center items-center p-5">
            <button onClick={onPayment}>Pay</button>
          </div>
        </div>
      </div>
      <div className="col-span-2 pl-20 pr-14">
        <div className="h-36 w-full bg-white border-b-2  border-dashed rounded-b-xl p-5 flex flex-col gap-5">
          <div className="flex justify-between">
            <p className="font-semibold">{movieData.movie}</p>
            <p className="font-semibold">{movieData.seatCount} Tickets</p>
          </div>
          <div className="flex justify-between">
            <p>{movieData.theatre}</p>
            <p>{movieData.time}</p>
          </div>
          <div className="flex justify-between">
            <p>{movie.rating}</p>
            <p>{movie.votes}</p>
          </div>
        </div>
        <div className="w-full bg-white border-t-2  border-dashed rounded-t-xl flex flex-col gap-3">
          <div className="flex justify-between pl-5 pt-5 pr-5">
            <p className="text-sm">Sub Total</p>
            <p>Rs.{movieData.seatCount * 240}</p>
          </div>
          <div className="flex justify-between pl-5 pr-5">
            <p className="text-sm">Convenience fees</p>
            <p>Rs.51.92</p>
          </div>
          <div className="flex justify-between bg-yellow-50 pl-5 pr-5 pb-3 pt-3">
            <p>Amount Payable</p>
            <p className="font-semibold text-lg">
              {movieData.seatCount * 240 + 51.92}
            </p>
          </div>
        </div>
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
                Payment Success
              </DialogTitle>
              <div className="flex justify-center items-center p-3 border border-t border-gray-300">
                <Button
                  onClick={close}
                  className="bg-red-500 text-white py-1 px-5 rounded-md"
                >
                  view ticket
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
