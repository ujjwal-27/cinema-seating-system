# Cinema Seating Allocation System

## Overview

The Cinema Seating Allocation System is a React and TypeScript based application developed to simulate intelligent cinema seat booking and automatic seat allocation.

The system allows users to:

* View a cinema seating layout
* Select seat categories
* Automatically allocate optimal seats
* Confirm bookings
* Simulate crowded cinema environments
* Handle broken and unavailable seats

The project was developed as part of an Advanced Topics in Software Engineering assignment.

---

# Features

## Cinema Layout

* Multi-row cinema seating plan
* Visual aisle separation using null-based layout modelling
* Cinema screen display

## Seat Categories

The system supports multiple seat types:

* Standard Seats
* VIP Seats
* Accessibility Seats
* Broken Seats

## Automatic Seat Allocation

The allocation algorithm:

* Finds valid contiguous seat blocks
* Filters by seat type
* Avoids unavailable seats
* Scores seat blocks
* Selects the highest-ranked seating option

## Booking Management

Users can:

* Manually select seats
* Automatically allocate seats
* Confirm bookings
* Prevent double booking

## Crowd Simulation

The application includes a crowd simulation feature to test algorithm behaviour in heavily occupied cinema conditions.

---

# Technologies Used

* React
* TypeScript
* Vite
* CSS Inline Styling

---

# Project Structure

src/
│
├── components/
│ ├── SeatGrid.tsx
│ └── ControlPanel.tsx
│
├── data/
│ └── cinemaLayout.ts
│
├── models/
│ └── Seat.ts
│
├── services/
│ └── SeatAllocator.ts
│
└── App.tsx

---

# Seat Allocation Algorithm

The system uses a rule-based seat allocation algorithm.

## Allocation Process

1. Filter seats by:

   * Seat type
   * Availability
   * Row

2. Find continuous seat blocks matching the requested group size

3. Score candidate blocks using:

   * Centre proximity
   * Preferred row weighting

4. Select the highest-ranked block

## Allocation Priorities

The algorithm prioritises:

* Consecutive seating
* Central viewing positions
* Preferred middle rows
* Avoiding broken or booked seats

---

# How to Run the Project

## Install Dependencies

npm install

## Start Development Server

npm run dev

## Build Production Version

npm run build

---

# Future Improvements

Potential future enhancements include:

* Database integration
* Real-time booking updates
* User authentication
* Payment integration
* Advanced fragmentation analysis
* Dynamic pricing

---

# Author

Ujjwal Shrestha
