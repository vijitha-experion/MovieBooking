import { Routes, Route } from "react-router-dom";

import { Header } from "../Features/Header/intex";
import { Home } from "../Features/Home/intex";
import { Booking } from "../Features/Booking/intex";
import { SeatSelect } from "../Features/SeatSelect/intex";
import { ConfirmBooking } from "../Features/ConfirmBooking/intex";

function Router() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/seatSelect" element={<SeatSelect />} />
        <Route path="/confirmBooking" element={<ConfirmBooking />} />
      </Routes>
    </div>
  );
}

export default Router;
