import { useState } from "react";

import SeatGrid from "./components/SeatGrid";

import { cinemaSeats } from "./data/cinemaLayout";

import { SeatStatus } from "./models/Seat";

function App() {
  const [seats, setSeats] = useState(cinemaSeats);

  const handleSeatClick = (seatId: string) => {
    setSeats((currentSeats) =>
      currentSeats.map((seat) => {
        if (seat.id !== seatId) {
          return seat;
        }

        if (seat.status === SeatStatus.BROKEN) {
          return seat;
        }

        return {
          ...seat,
          status:
            seat.status === SeatStatus.SELECTED
              ? SeatStatus.AVAILABLE
              : SeatStatus.SELECTED,
        };
      })
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cinema Seating Allocation System</h1>

      <SeatGrid
        seats={seats}
        onSeatClick={handleSeatClick}
      />
    </div>
  );
}

export default App;