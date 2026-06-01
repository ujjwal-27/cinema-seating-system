export const SeatType = {
  STANDARD: "STANDARD",
  VIP: "VIP",
  ACCESSIBILITY: "ACCESSIBILITY",
} as const;

export type SeatType = (typeof SeatType)[keyof typeof SeatType];

export const SeatStatus = {
  AVAILABLE: "AVAILABLE",
  SELECTED: "SELECTED",
  BOOKED: "BOOKED",
  BROKEN: "BROKEN",
} as const;

export type SeatStatus = (typeof SeatStatus)[keyof typeof SeatStatus];

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: SeatType;
  status: SeatStatus;
}