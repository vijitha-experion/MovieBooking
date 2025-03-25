import { Routes, Route, useLocation } from "react-router-dom";

import { Header } from "../Features/Header/intex";
import { Home } from "../Features/Home/intex";
import { Booking } from "../Features/Booking/intex";
import { SeatSelect } from "../Features/SeatSelect/intex";
import { ConfirmBooking } from "../Features/ConfirmBooking/intex";
import { ViewTicket } from "../Features/ViewTicket/intex";
import { Signin } from "../Features/Signin/intex";
import { SignUp } from "../Features/SignUp/intex";
import { BookedTickets } from "../Features/BookedTickets/intex";

function Router() {
  const location = useLocation();
  return (
    <div>
      {location.pathname === "/" || location.pathname === "/signUp" ? null : (
        <Header />
      )}
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/seatSelect" element={<SeatSelect />} />
        <Route path="/confirmBooking" element={<ConfirmBooking />} />
        <Route path="/viewTicket" element={<ViewTicket />} />
        <Route path="/bookedTickets" element={<BookedTickets />} />
      </Routes>
    </div>
  );
}

export default Router;
