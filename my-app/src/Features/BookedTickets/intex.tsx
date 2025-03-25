import { ReactElement } from "react";
import { useLocation } from "react-router-dom";
import { TicketBookedType } from "./Types/ticketBookedType";

export function BookedTickets(): ReactElement {
  const location = useLocation();
  const filteredData = location.state.filteredData;
  console.log(filteredData, "filteredData");
  return (
    <div>
      <h1 className="pl-14 pt-5 font-semibold">Booked Tickets</h1>
      <div className="pl-14 pt-5 flex flex-wrap gap-5">
        {filteredData?.map((item: TicketBookedType) => (
          <div className="bg-white p-5 rounded-lg w-96 flex">
            <div className="flex gap-8 text-slate-700">
              <img
                src={require(`../../assets/image/${item.image}.jpg`)}
                alt="img"
                className="w-32 h-52 rounded-lg"
              />{" "}
              <div className="flex flex-col gap-2">
                <p className="text-black font-semibold">{item?.movie}</p>
                <p className="font-semibold">{item?.seatCount} Tickets</p>
                <p>{item?.theatre}</p>
                <p>{item.date}</p>
                <p>{item.time}</p>
                <div className="flex gap-3">
                  <p>Seats:</p>
                  {item?.seats?.map((item: any) => (
                    <p>{item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
