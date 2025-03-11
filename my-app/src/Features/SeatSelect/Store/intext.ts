import { create } from "zustand";
import { produce } from "immer";

type SeatStoreState = {
  selectedSeats: string[];
  setSelectedSeats: (seat: string, maxSeats: number) => void;
  clearSelectedSeats: () => void;
};

export const useSelectSeat = create<SeatStoreState>((set, get) => ({
  selectedSeats: [],

  setSelectedSeats: (seat, maxSeats) => {
    set(
      produce((state: SeatStoreState) => {
        const isSelected = state.selectedSeats.includes(seat);
        if (isSelected) {
          state.selectedSeats = state.selectedSeats.filter((s) => s !== seat);
        } else if (state.selectedSeats.length < maxSeats) {
          state.selectedSeats.push(seat);
        }
    })
);
},

  clearSelectedSeats: () => {
    set(
      produce((state: SeatStoreState) => {
        localStorage.removeItem("editParticipant");
        state.selectedSeats = [];
      })
    );
  },
}));
