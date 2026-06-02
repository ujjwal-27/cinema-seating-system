import {
    SeatStatus,
    SeatType,
} from "../models/Seat";

import type {
    Seat,
} from "../models/Seat";

/**
 * Layout based on the cinema seating plan provided in the assignment specification.
 * Null values represent aisles and non-seating spaces.
 */
const rowConfiguration: Record<string, (number | null)[]> = {
    A: [
        1, 2,
        null, null, null, null,
        5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16,
        17, 18, 19, 20, 21, 22,
        23, 24,
        null, null, null, null,
        27, 28,
    ],

    B: [
        1, 2, 3, 4,
        null, null,
        5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16,
        17, 18, 19, 20, 21, 22,
        23, 24,
        null, null,
        25, 26, 27, 28,
    ],

    C: [
        1, 2, 3, 4,
        null, null,
        5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16,
        17, 18, 19, 20, 21, 22,
        23, 24,
        null, null,
        25, 26, 27, 28,
    ],

    D: [
        1, 2, 3, 4,
        null, null,
        5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16,
        17, 18, 19, 20, 21, 22,
        23, 24,
        null, null,
        25, 26, 27, 28,
    ],

    E: [
        1, 2, 3, 4,
        null, null,
        5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16,
        17, 18, 19, 20, 21, 22,
        23, 24,
        null, null,
        25, 26, 27, 28,
    ],

    F: [
        null,
        1, 2, 3, 4,
        null,
        5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
        null, null,
        25, 26, 27, 28
    ],

    G: [
        null,
        1, 2, 3, 4,
        null, null,
        5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
        null,
        25, 26, 27, 28,
    ],

    H: [
        null, null,
        1, 2, 3, 4,
        null,
        5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
        null, null,
        25, 26, 27, 28,
    ],

    I: [
        null, null,
        1, 2, 3, 4,
        null, null,
        5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        null, null,
        25, 26, 27, 28,
    ],

    J: [
        null, null, null,
        1, 2, 3, 4,
        null,
        5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        null, null,
        25, 26, 27, 28,
    ],

    K: [
        null, null, null,
        1, 2, 3, 4,
        null, null,
        5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
        null, null,
        25, 26, 27, 28,
    ],

    L: [
        null, null, null, null,
        1, 2, 3, 4,
        null,
        5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
        null, null,
        25, 26, 27, 28
    ],

    M: [
        null, null, null, null,
        1, 2, 3, 4,
        null, null,
        5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
        null,
        25, 26, 27, 28
    ],

    N: [
        null, null, null, null, null,
        1, 2, 3, 4,
        null,
        5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        null, null,
        25, 26, 27, 28
    ],

    O: [
        null, null, null, null, null,
        1, 2, 3, 4,
        null, null,
        5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
        null,
        25, 26, 27, 28
    ],
};

export function generateCinemaLayout(): Seat[] {
    const seats: Seat[] = [];

    const vipRows = ["E", "F", "G", "H"];

    const accessibilitySeats = [
        "N1",
        "N2",
        "N3",
        "O1",
        "O2",
        "O3",
    ];

    const brokenSeats = [
        "C7",
        "E25",
        "J25",
        "L6",
        "M10",
    ];

    Object.entries(rowConfiguration).forEach(([row, seatNumbers]) => {
        seatNumbers.forEach((seatNumber) => {
            if (seatNumber === null) {
                return;
            }

            const seatId = `${row}${seatNumber}`;

            let type: SeatType = SeatType.STANDARD;
            let status: SeatStatus = SeatStatus.AVAILABLE;

            // VIP seats
            if (
                vipRows.includes(row) &&
                seatNumber >= 8 &&
                seatNumber <= 20
            ) {
                type = SeatType.VIP;
            }

            // Accessibility seats
            if (accessibilitySeats.includes(seatId)) {
                type = SeatType.ACCESSIBILITY;
            }

            // Broken seats
            if (brokenSeats.includes(seatId)) {
                status = SeatStatus.BROKEN;
            }

            seats.push({
                id: seatId,
                row,
                number: seatNumber,
                type,
                status,
            });
        });
    });

    return seats;
}

export const cinemaSeats = generateCinemaLayout();

export const seatMap = new Map(
    cinemaSeats.map((seat) => [seat.id, seat])
);

export { rowConfiguration };
