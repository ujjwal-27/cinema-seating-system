import type { Seat } from "../models/Seat";
import { SeatStatus, SeatType } from "../models/Seat";

interface SeatBlockScore {
    seats: Seat[];
    score: number;
}

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

    static evaluateSeatBlocks(
        blocks: Seat[][]
    ): SeatBlockScore[] {
        return blocks.map((block) => ({
            seats: block,
            score:
                SeatAllocator.calculateCenterScore(
                    block
                ),
        }));
    }

    static rankSeatBlocks(
        blocks: Seat[][]
    ): Seat[] {
        const scoredBlocks =
            SeatAllocator.evaluateSeatBlocks(
                blocks
            );

        scoredBlocks.sort(
            (a, b) => b.score - a.score
        );

        return scoredBlocks[0]?.seats ?? [];
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

    private static calculateCenterScore(
        block: Seat[]
    ): number {
        const averageSeatNumber =
            block.reduce(
                (sum, seat) => sum + seat.number,
                0
            ) / block.length;

        const idealCentre = 14;

        return (
            100 -
            Math.abs(
                idealCentre - averageSeatNumber
            )
        );
    }
}