import { useState } from "react";

import SeatGrid from "./components/SeatGrid";

import { cinemaSeats } from "./data/cinemaLayout";

import { SeatStatus, SeatType } from "./models/Seat";
import ControlPanel from "./components/ControlPanel";
import { SeatAllocator } from "./services/SeatAllocator";

function App() {
  const [seats, setSeats] = useState(cinemaSeats);

  const [groupSize, setGroupSize] =
    useState(1);

  const [seatType, setSeatType] =
    useState<SeatType>(
      SeatType.STANDARD
    );

  const handleSeatClick = (seatId: string) => {
    setSeats((currentSeats) =>
      currentSeats.map((seat) => {
        if (seat.id !== seatId) {
          return seat;
        }

        if (
          seat.status === SeatStatus.BROKEN ||
          seat.status === SeatStatus.BOOKED
        ) {
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

  const handleAutoAllocate = () => {
    const resetSeats = seats.map((seat) => {
      if (seat.status === SeatStatus.SELECTED) {
        return {
          ...seat,
          status: SeatStatus.AVAILABLE,
        };
      }

      return seat;
    });

    const validBlocks =
      SeatAllocator.findValidSeatBlocks(
        resetSeats,
        groupSize,
        seatType
      );

    const bestBlock =
      SeatAllocator.rankSeatBlocks(
        validBlocks
      );

    if (bestBlock.length === 0) {
      alert("No suitable seats available.");
      return;
    }

    const selectedIds = new Set(
      bestBlock.map((seat) => seat.id)
    );

    setSeats(
      resetSeats.map((seat) => {
        if (
          selectedIds.has(seat.id)
        ) {
          return {
            ...seat,
            status: SeatStatus.SELECTED,
          };
        }

        return seat;
      })
    );
  };

  const handleConfirmBooking = () => {
    setSeats((currentSeats) =>
      currentSeats.map((seat) => {
        if (seat.status === SeatStatus.SELECTED) {
          return {
            ...seat,
            status: SeatStatus.BOOKED,
          };
        }

        return seat;
      })
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cinema Seating Allocation System</h1>

      <ControlPanel
        groupSize={groupSize}
        seatType={seatType}
        onGroupSizeChange={setGroupSize}
        onSeatTypeChange={setSeatType}
        onAutoAllocate={handleAutoAllocate}
      />

      <button
        onClick={handleConfirmBooking}
        style={{
          marginBottom: "20px",
        }}
      >
        Confirm Booking
      </button>

      <SeatGrid
        seats={seats}
        onSeatClick={handleSeatClick}
      />
    </div>
  );
}

export default App;
