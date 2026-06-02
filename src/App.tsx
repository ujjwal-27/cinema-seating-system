import { useState } from "react";

import SeatGrid from "./components/SeatGrid";

import { cinemaSeats } from "./data/cinemaLayout";

import { SeatStatus, SeatType } from "./models/Seat";
import ControlPanel from "./components/ControlPanel";
import { SeatAllocator } from "./services/SeatAllocator";

function LegendItem({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <div
        style={{
          width: "20px",
          height: "20px",
          backgroundColor: color,
          borderRadius: "4px",
          border: "1px solid black",
        }}
      />

      <span>{label}</span>
    </div>
  );
}

function App() {
  const [seats, setSeats] = useState(cinemaSeats);

  const [groupSize, setGroupSize] =
    useState(1);

  const [seatType, setSeatType] =
    useState<SeatType>(
      SeatType.STANDARD
    );

  const [adminOverride, setAdminOverride] =
    useState(false);

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
      if (
        seat.status === SeatStatus.SELECTED
      ) {
        return {
          ...seat,
          status: SeatStatus.AVAILABLE,
        };
      }

      return seat;
    });

    let bestBlock: typeof seats = [];

    if (adminOverride) {
      bestBlock = resetSeats
        .filter(
          (seat) =>
            seat.type === seatType &&
            seat.status ===
            SeatStatus.AVAILABLE
        )
        .slice(0, groupSize);
    } else {
      const validBlocks =
        SeatAllocator.findValidSeatBlocks(
          resetSeats,
          groupSize,
          seatType
        );

      bestBlock =
        SeatAllocator.rankSeatBlocks(
          validBlocks
        );
    }

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

  const handleMassBooking = () => {
    const availableSeats = seats.filter(
      (seat) =>
        seat.status === SeatStatus.AVAILABLE &&
        seat.type === SeatType.STANDARD
    );

    const shuffled = [...availableSeats].sort(
      () => Math.random() - 0.5
    );

    const seatsToBook = shuffled.slice(0, 80);

    const bookedIds = new Set(
      seatsToBook.map((seat) => seat.id)
    );

    setSeats(
      seats.map((seat) => {
        if (bookedIds.has(seat.id)) {
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
        adminOverride={adminOverride}
        onAdminOverrideChange={
          setAdminOverride
        }
        onGroupSizeChange={setGroupSize}
        onSeatTypeChange={setSeatType}
        onAutoAllocate={handleAutoAllocate}
      />

      <div
        style={{
          display: "flex",
          gap: "16px",
          marginTop: "20px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <LegendItem
          color="#3498db"
          label="Standard"
        />

        <LegendItem
          color="#8e44ad"
          label="VIP"
        />

        <LegendItem
          color="#00cfe8"
          label="Accessibility"
        />

        <LegendItem
          color="#e74c3c"
          label="Broken"
        />

        <LegendItem
          color="#2ecc71"
          label="Selected"
        />

        <LegendItem
          color="#2c3e50"
          label="Booked"
        />
      </div>

      <button
        onClick={handleConfirmBooking}
        style={{
          marginBottom: "20px",
        }}
      >
        Confirm Booking
      </button>

      <button
        onClick={handleMassBooking}
        style={{
          marginLeft: "10px",
        }}
      >
        Simulate Crowd
      </button>

      <SeatGrid
        seats={seats}
        onSeatClick={handleSeatClick}
      />
    </div>
  );
}

export default App;
