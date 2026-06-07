import type { Seat } from "../models/Seat";
import { SeatStatus, SeatType } from "../models/Seat";

// Interface used to store a seat block together with its calculated score
interface SeatBlockScore {
    seats: Seat[];
    score: number;
}

export class SeatAllocator {

    // Main function used to find all valid seat blocks
    // based on requested group size and seat type
    static findValidSeatBlocks(
        seats: Seat[],
        groupSize: number,
        seatType: SeatType
    ): Seat[][] {

        // Stores all valid seat combinations
        const validBlocks: Seat[][] = [];

        // Extract all unique cinema rows
        const rows = [...new Set(seats.map((seat) => seat.row))];

        // Process seats row by row
        rows.forEach((row) => {

            // Filter seats that:
            // - belong to the current row
            // - match the requested seat type
            // - are currently available
            // - for standard seats, stay within preferred centre range
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

                // Sort seats by seat number
                // to help identify continuous seat blocks
                .sort((a, b) => a.number - b.number);

            // Loop through possible seat combinations
            for (
                let start = 0;
                start <= rowSeats.length - groupSize;
                start++
            ) {

                // Create a potential seat block
                const block = rowSeats.slice(
                    start,
                    start + groupSize
                );

                // Check if the block contains consecutive seats
                if (
                    SeatAllocator.isContinuousBlock(block)
                ) {

                    // Store valid seat block
                    validBlocks.push(block);
                }
            }
        });

        return validBlocks;
    }

    // Evaluates all valid seat blocks and assigns a score
    static evaluateSeatBlocks(
        blocks: Seat[][]
    ): SeatBlockScore[] {

        return blocks.map((block) => ({
            seats: block,

            // Final score combines:
            // - centre proximity score
            // - preferred row score
            score:
                SeatAllocator.calculateCenterScore(block)
                +
                SeatAllocator.calculateRowScore(block),
        }));
    }

    // Selects the highest-ranked seating block
    static rankSeatBlocks(
        blocks: Seat[][]
    ): Seat[] {

        // Calculate scores for all blocks
        const scoredBlocks =
            SeatAllocator.evaluateSeatBlocks(
                blocks
            );

        // Sort blocks by highest score first
        scoredBlocks.sort(
            (a, b) => b.score - a.score
        );

        // Return best seating block
        // If none exist, return empty array
        return scoredBlocks[0]?.seats ?? [];
    }

    // Checks whether all seats inside a block
    // are consecutive seat numbers
    private static isContinuousBlock(
        block: Seat[]
    ): boolean {

        for (let i = 0; i < block.length - 1; i++) {

            // If seat numbers are not consecutive,
            // the block is invalid
            if (
                block[i + 1].number !==
                block[i].number + 1
            ) {
                return false;
            }
        }

        return true;
    }

    // Calculates score based on how close seats are
    // to the centre of the cinema
    private static calculateCenterScore(
        block: Seat[]
    ): number {

        // Find average seat position
        const averageSeatNumber =
            block.reduce(
                (sum, seat) => sum + seat.number,
                0
            ) / block.length;

        // Preferred centre seat position
        const idealCentre = 14;

        // Higher score = closer to centre
        return (
            100 -
            Math.abs(
                idealCentre - averageSeatNumber
            )
        );
    }

    // Calculates score based on preferred cinema rows
    private static calculateRowScore(
        block: Seat[]
    ): number {

        // Retrieve row from first seat
        const row = block[0].row;

        // Middle rows receive higher priority scores
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

        // Return row score
        // Default to 0 if row is undefined
        return rowScores[row] ?? 0;
    }
}
