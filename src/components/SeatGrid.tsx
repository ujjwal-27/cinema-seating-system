import { rowConfiguration } from "../data/cinemaLayout";

function SeatGrid() {
  const rows = Object.keys(rowConfiguration);

  return (
    <div>
      <h2>Cinema Seating Layout</h2>

      {rows.map((row) => (
        <div
          key={row}
          style={{
            display: "flex",
            gap: "6px",
            marginBottom: "8px",
            alignItems: "center",
          }}
        >
          <strong style={{ width: "30px" }}>{row}</strong>

          {rowConfiguration[row].map((seatNumber, index) => {
            if (seatNumber === null) {
              return (
                <div
                  key={`gap-${index}`}
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                />
              );
            }

            return (
              <div
                key={`${row}${seatNumber}`}
                style={{
                  width: "40px",
                  height: "40px",
                  border: "1px solid black",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {seatNumber}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default SeatGrid;