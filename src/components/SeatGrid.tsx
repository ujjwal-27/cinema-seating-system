import { cinemaSeats } from "../data/cinemaLayout";

function SeatGrid() {
  return (
    <div>
      <h2>Cinema Seating Layout</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
        }}
      >
        {cinemaSeats.map((seat) => (
          <div
            key={seat.id}
            style={{
              width: "50px",
              height: "50px",
              border: "1px solid black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "4px",
            }}
          >
            {seat.id}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeatGrid;