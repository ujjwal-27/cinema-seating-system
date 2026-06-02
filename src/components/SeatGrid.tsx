import {
    rowConfiguration,
    seatMap,
} from "../data/cinemaLayout";

import {
    SeatStatus,
    SeatType,
} from "../models/Seat";

import type { Seat } from "../models/Seat";

interface SeatGridProps {
    seats: Seat[];
    onSeatClick: (seatId: string) => void;
}

function SeatGrid({
    seats,
    onSeatClick,
}: SeatGridProps) {
    const rows = Object.keys(rowConfiguration);

    const seatLookup = new Map(
        seats.map((seat) => [seat.id, seat])
    );

    const getSeatColor = (seatId: string) => {
        const seat = seatLookup.get(seatId);

        if (!seat) {
            return "#ffffff";
        }

        if (seat.status === SeatStatus.SELECTED) {
            return "#2ecc71";
        }

        if (seat.status === SeatStatus.BOOKED) {
            return "#2c3e50";
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
                                onClick={() =>
                                    onSeatClick(`${row}${seatNumber}`)
                                }
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
                                    cursor: "pointer",
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
