import { Routes, Route } from "react-router-dom";

import { Header } from "../Features/Header/intex";
import { Home } from "../Features/Home/intex";
import { Booking } from "../Features/Booking/intex";
import { SeatSelect } from "../Features/SeatSelect/intex";
import { ConfirmBooking } from "../Features/ConfirmBooking/intex";
import { ViewTicket } from "../Features/ViewTicket/intex";
import { Signin } from "../Features/Signin/intex";

function Router() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/seatSelect" element={<SeatSelect />} />
        <Route path="/confirmBooking" element={<ConfirmBooking />} />
        <Route path="/viewTicket" element={<ViewTicket />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
}

export default Router;
