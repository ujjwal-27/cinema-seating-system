# Cinema Seating Allocation System

## Overview

The Cinema Seating Allocation System is a React and TypeScript based application developed to simulate an intelligent cinema seat booking and allocation system.

The application demonstrates a plan-driven software engineering approach through the implementation of a rule-based seating allocation algorithm designed to optimise seating efficiency while minimising fragmented seating arrangements.

The system supports:

* Interactive cinema seating visualisation
* Automatic seat allocation
* Group-based seating optimisation
* VIP and accessibility seating
* Broken seat handling
* Booking confirmation
* Stress testing through crowd simulation
* Unit testing using Vitest

This project was developed for the Advanced Topics in Software Engineering module.

---

# Features

## Interactive Cinema Layout

* Multi-row cinema seating arrangement
* Visual aisle separation using null-based spacing
* Cinema screen positioning
* Realistic venue layout modelling

---

# Seat Categories

The system supports multiple seating categories:

| Seat Type     | Description                             |
| ------------- | --------------------------------------- |
| Standard      | Regular cinema seating                  |
| VIP           | Premium seating located in central rows |
| Accessibility | Reserved accessible seating             |
| Broken        | Unavailable seats randomly distributed  |

---

# Automatic Seat Allocation

The system includes a rule-based allocation algorithm that:

* Finds valid contiguous seat blocks
* Prevents fragmented seating
* Prioritises centre viewing positions
* Prioritises preferred middle rows
* Avoids booked and broken seats
* Filters allocations by seat type
* Allocates groups together where possible

---

# Booking Management

Users can:

* Select seats manually
* Automatically allocate seats
* Confirm bookings
* Prevent duplicate bookings
* Reallocate seats after failed allocation attempts

---

# Crowd Simulation

The application includes a crowd simulation feature that:

* Randomly books large portions of the cinema
* Simulates nearly full cinema environments
* Stress-tests the seating allocation algorithm
* Demonstrates algorithm behaviour under constrained seating conditions

This feature was specifically implemented to satisfy stress-testing requirements from the coursework brief.

---

# Admin Override

An admin override feature is included to simulate administrative control over booking behaviour.

This allows the system to bypass seating restrictions when necessary for management purposes.

---

# Seat Legend

The interface includes a visual legend identifying:

* Standard seats
* VIP seats
* Accessibility seats
* Broken seats
* Selected seats
* Booked seats

---

# Technologies Used

* React
* TypeScript
* Vite
* Vitest
* Inline CSS Styling

---

# Project Structure

```text
src/
│
├── components/
│   ├── SeatGrid.tsx
│   └── ControlPanel.tsx
│
├── data/
│   └── cinemaLayout.ts
│
├── models/
│   └── Seat.ts
│
├── services/
│   ├── SeatAllocator.ts
│   └── SeatAllocator.test.ts
│
└── App.tsx
```

---

# Seat Allocation Algorithm

The system uses a rule-based seat allocation algorithm designed to optimise cinema occupancy while reducing scattered seating fragmentation.

## Allocation Process

### 1. Seat Filtering

The algorithm filters seats by:

* Seat availability
* Seat type
* Row grouping

### 2. Continuous Block Detection

The system searches for:

* Consecutive seats
* Matching group size
* Valid uninterrupted seat blocks

### 3. Seat Block Scoring

Candidate seat blocks are scored using:

* Centre proximity scoring
* Preferred row weighting
* Viewing quality prioritisation

### 4. Optimal Selection

The highest-ranked seat block is selected and automatically allocated.

---

# Allocation Priorities

The algorithm prioritises:

* Consecutive seating
* Central viewing positions
* Middle cinema rows
* Group seating optimisation
* Avoiding broken seats
* Avoiding booked seats
* Minimising fragmented seating gaps

---

# Testing Strategy

The project includes automated unit testing using Vitest.

## Implemented Tests

* Seat block ranking
* Empty allocation handling
* Booked seat filtering
* Broken seat filtering
* Seat type validation

## Testing Tools

* Vitest

---

# How to Run the Project

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

## Run Unit Tests

```bash
npx vitest
```

## Build Production Version

```bash
npm run build
```

---

# Future Improvements

Potential future enhancements include:

* Database integration
* Real-time booking synchronisation
* User authentication
* Payment gateway integration
* Dynamic pricing strategies
* Advanced fragmentation analysis
* Reservation expiry timers
* Seat cancellation and reallocation

---

# Author

Ujjwal Shrestha

---

# Academic Context

This project was developed as part of the:

Advanced Topics in Software Engineering module

with a focus on:

* Plan-driven software development
* Seating optimisation algorithms
* UML-based system modelling
* Stress testing
* Rule-based allocation systems
* Test-driven development principles
