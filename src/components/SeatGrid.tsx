import {
    rowConfiguration,
    seatMap,
} from "../data/cinemaLayout";

import {
    SeatStatus,
    SeatType,
} from "../models/Seat";

function SeatGrid() {
    const rows = Object.keys(rowConfiguration);

    const getSeatColor = (seatId: string) => {
        const seat = seatMap.get(seatId);

        if (!seat) {
            return "#ffffff";
        }

        if (seat.status === SeatStatus.BROKEN) {
            return "#e74c3c";
        }

        if (seat.type === SeatType.ACCESSIBILITY) {
            return "#00cfe8";
        }

        if (seat.type === SeatType.VIP) {
            return "#8e44ad";
        }

        return "#3498db";
    };

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

                                    backgroundColor: getSeatColor(
                                        `${row}${seatNumber}`
                                    ),

                                    color: "white",
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