import { cinemaSeats } from "../data/cinemaLayout";

function SeatGrid() {
  const rows = [...new Set(cinemaSeats.map((seat) => seat.row))];

  return (
    <div>
      <h2>Cinema Seating Layout</h2>

      {rows.map((row) => {
        const rowSeats = cinemaSeats.filter(
          (seat) => seat.row === row
        );

        return (
          <div
            key={row}
            style={{
              display: "flex",
              gap: "6px",
              marginBottom: "8px",
              alignItems: "center",
            }}
          >
            <strong
              style={{
                width: "30px",
              }}
            >
              {row}
            </strong>

            {rowSeats.map((seat) => (
              <div
                key={seat.id}
                style={{
                  width: "40px",
                  height: "40px",
                  border: "1px solid black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "4px",
                }}
              >
                {seat.number}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default SeatGrid;