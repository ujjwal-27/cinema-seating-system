import type { Seat } from "../models/Seat";
import { SeatStatus, SeatType } from "../models/Seat";

const rowConfiguration: Record<string, (number | null)[]> = {
  A: [
    1, 2,
    null, null,
    5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22,
    23, 24,
    null, null,
    27, 28,
],

  B: [
    1, 2, 3, 4,
    null,
    5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22,
    23, 24,
    null,
    25, 26, 27, 28,
],

    C: [
    1, 2, 3, 4,
    null,
    5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22,
    23, 24,
    null,
    25, 26, 27, 28,
    ],

    D: [
    1, 2, 3, 4,
    null,
    5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22,
    23, 24,
    null,
    25, 26, 27, 28,
    ],

    E: [
    1, 2, 3, 4,
    null,
    5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22,
    23, 24,
    null,
    25, 26, 27, 28,
    ],

  F: Array.from({ length: 28 }, (_, i) => i + 1),

  G: Array.from({ length: 28 }, (_, i) => i + 1),

  H: Array.from({ length: 28 }, (_, i) => i + 1),

  I: Array.from({ length: 28 }, (_, i) => i + 1),

  J: Array.from({ length: 28 }, (_, i) => i + 1),

  K: Array.from({ length: 28 }, (_, i) => i + 1),

  L: Array.from({ length: 28 }, (_, i) => i + 1),

  M: Array.from({ length: 28 }, (_, i) => i + 1),

  N: Array.from({ length: 28 }, (_, i) => i + 1),

  O: Array.from({ length: 28 }, (_, i) => i + 1),
};

export function generateCinemaLayout(): Seat[] {
  const seats: Seat[] = [];

  Object.entries(rowConfiguration).forEach(([row, seatNumbers]) => {
    seatNumbers.forEach((seatNumber) => {
        if (seatNumber === null) {
            return;
        }
        
        seats.push({
            id: `${row}${seatNumber}`,
            row,
            number: seatNumber,
            type: SeatType.STANDARD,
            status: SeatStatus.AVAILABLE,
        });
    });
  });

  return seats;
}

export const cinemaSeats = generateCinemaLayout();
