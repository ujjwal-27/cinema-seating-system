import type { Seat } from "../models/Seat";
import { SeatStatus, SeatType } from "../models/Seat";

export class SeatAllocator {
    static findValidSeatBlocks(
        seats: Seat[],
        groupSize: number,
        seatType: SeatType
    ): Seat[][] {
        const validBlocks: Seat[][] = [];

        const rows = [...new Set(seats.map((seat) => seat.row))];

        rows.forEach((row) => {
            const rowSeats = seats
                .filter(
                    (seat) =>
                        seat.row === row &&
                        seat.type === seatType &&
                        seat.status === SeatStatus.AVAILABLE
                )
                .sort((a, b) => a.number - b.number);

            for (
                let start = 0;
                start <= rowSeats.length - groupSize;
                start++
            ) {
                const block = rowSeats.slice(
                    start,
                    start + groupSize
                );

                if (
                    SeatAllocator.isContinuousBlock(block)
                ) {
                    validBlocks.push(block);
                }
            }
        });

        return validBlocks;
    }

    private static isContinuousBlock(
        block: Seat[]
    ): boolean {
        for (let i = 0; i < block.length - 1; i++) {
            if (
                block[i + 1].number !==
                block[i].number + 1
            ) {
                return false;
            }
        }

        return true;
    }
}