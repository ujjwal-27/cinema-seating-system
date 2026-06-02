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
                        seat.status === SeatStatus.AVAILABLE &&
                        (
                            seatType !== SeatType.STANDARD ||
                            (seat.number >= 5 && seat.number <= 24)
                        )
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
                SeatAllocator.calculateCenterScore(block)
                +
                SeatAllocator.calculateRowScore(block),
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

    private static calculateRowScore(
        block: Seat[]
    ): number {
        const row = block[0].row;

        const rowScores: Record<string, number> = {
            A: 10,
            B: 20,
            C: 30,
            D: 40,
            E: 60,
            F: 80,
            G: 100,
            H: 100,
            I: 80,
            J: 60,
            K: 40,
            L: 30,
            M: 20,
            N: 10,
            O: 10,
        };

        return rowScores[row] ?? 0;
    }
}