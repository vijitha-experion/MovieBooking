import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

export function Header(): ReactElement {
  const navigate = useNavigate();
  const existingUsers = JSON.parse(localStorage.getItem("UserDetails") || "[]");
  const signUpDetailsArray = JSON.parse(
    localStorage.getItem("signUpDetails") || "[]"
  );

  const lastSignUp = signUpDetailsArray.length
    ? signUpDetailsArray[signUpDetailsArray.length - 1]
    : {};

  const filteredData = existingUsers.filter(
    (item: any) => item.signUpEmail === lastSignUp.email
  );
  function bookedTickets() {
    navigate("/bookedTickets", { state: { filteredData: filteredData } });
  }
  function goToHome() {
    navigate("/home");
  }
  return (
    <div className="h-14 flex items-center justify-between shadow-xl bg-white">
      <h1 className="text-red-500 font-extrabold text-lg pl-14">Movie Time</h1>
      <button className="font-semibold" onClick={goToHome}>
        Home
      </button>
      {filteredData ? (
        <button
          className="mr-14 border border-gray-400 px-3 py-1 rounded-md"
          onClick={bookedTickets}
        >
          Booked Tickets
        </button>
      ) : null}
    </div>
  );
}
