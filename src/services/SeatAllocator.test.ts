import { describe, it, expect } from "vitest";

import { SeatAllocator } from "./SeatAllocator";

import {
    SeatStatus,
    SeatType,
} from "../models/Seat";

import type { Seat } from "../models/Seat";

/*
  Mock seat data used for testing
  the seat allocation service.
*/
const mockSeats: Seat[] = [
    {
        id: "H10",
        row: "H",
        number: 10,
        type: SeatType.STANDARD,
        status: SeatStatus.AVAILABLE,
    },
    {
        id: "H11",
        row: "H",
        number: 11,
        type: SeatType.STANDARD,
        status: SeatStatus.AVAILABLE,
    },
];

/*
  Unit tests for SeatAllocator service.
*/
describe("SeatAllocator", () => {

    /*
      Verify that the ranking system
      returns the highest-ranked block.
    */
    it("should rank seat blocks", () => {

        const rankedSeats =
            SeatAllocator.rankSeatBlocks([
                mockSeats,
            ]);

        expect(rankedSeats.length).toBe(2);

        expect(rankedSeats[0].id).toBe("H10");
    });

    /*
    Verify that empty seat blocks
    return an empty allocation result.
  */
    it("should return empty result for no seat blocks", () => {

        const rankedSeats =
            SeatAllocator.rankSeatBlocks([]);

        expect(rankedSeats.length).toBe(0);

    });

    /*
  Verify that booked seats are not
  considered valid for allocation.
*/
    it("should ignore booked seats", () => {

        const bookedSeats: Seat[] = [
            {
                id: "H10",
                row: "H",
                number: 10,
                type: SeatType.STANDARD,
                status: SeatStatus.BOOKED,
            },
            {
                id: "H11",
                row: "H",
                number: 11,
                type: SeatType.STANDARD,
                status: SeatStatus.BOOKED,
            },
        ];

        const blocks =
            SeatAllocator.findValidSeatBlocks(
                bookedSeats,
                2,
                SeatType.STANDARD
            );

        expect(blocks.length).toBe(0);

    });


    /*
  Verify that broken seats are excluded
  from valid allocation blocks.
*/
    it("should ignore broken seats", () => {

        const brokenSeats: Seat[] = [
            {
                id: "H10",
                row: "H",
                number: 10,
                type: SeatType.STANDARD,
                status: SeatStatus.BROKEN,
            },
            {
                id: "H11",
                row: "H",
                number: 11,
                type: SeatType.STANDARD,
                status: SeatStatus.BROKEN,
            },
        ];

        const blocks =
            SeatAllocator.findValidSeatBlocks(
                brokenSeats,
                2,
                SeatType.STANDARD
            );

        expect(blocks.length).toBe(0);

    });

    /*
  Verify that seat allocation only
  returns seats matching the requested type.
*/
    it("should filter seats by seat type", () => {

        const vipSeats: Seat[] = [
            {
                id: "V1",
                row: "H",
                number: 1,
                type: SeatType.VIP,
                status: SeatStatus.AVAILABLE,
            },
            {
                id: "V2",
                row: "H",
                number: 2,
                type: SeatType.VIP,
                status: SeatStatus.AVAILABLE,
            },
        ];

        const blocks =
            SeatAllocator.findValidSeatBlocks(
                vipSeats,
                2,
                SeatType.VIP
            );

        expect(blocks.length).toBeGreaterThan(0);

    });
});