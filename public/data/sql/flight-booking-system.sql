-- Flight Booking System - Sample Schema for Neon PostgreSQL
-- Compatible with Neon (https://neon.tech)
-- Generated from SDD Academy project data

BEGIN;

-- flights: Flight schedules
CREATE TABLE "flights" (
  "id" SERIAL PRIMARY KEY,
  "flight_number" TEXT NOT NULL,
  "origin" TEXT NOT NULL,
  "destination" TEXT NOT NULL,
  "departure_at" TIMESTAMPTZ,
  "aircraft_id" INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- aircraft: Aircraft information
CREATE TABLE "aircraft" (
  "id" SERIAL PRIMARY KEY,
  "model" TEXT NOT NULL,
  "capacity" INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- seats: Seat configurations
CREATE TABLE "seats" (
  "id" SERIAL PRIMARY KEY,
  "aircraft_id" INTEGER NOT NULL,
  "seat_row" TEXT NOT NULL,
  "seat_label" TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- bookings: Customer bookings
CREATE TABLE "bookings" (
  "id" SERIAL PRIMARY KEY,
  "flight_id" INTEGER NOT NULL,
  "passenger_id" INTEGER,
  "status" TEXT DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- payments: Payment records
CREATE TABLE "payments" (
  "id" SERIAL PRIMARY KEY,
  "booking_id" INTEGER NOT NULL,
  "amount_cents" BIGINT NOT NULL,
  "currency" TEXT DEFAULT 'USD',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- passengers: Passenger details
CREATE TABLE "passengers" (
  "id" SERIAL PRIMARY KEY,
  "full_name" TEXT NOT NULL,
  "email" TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- loyalty: Loyalty program data
CREATE TABLE "loyalty" (
  "id" SERIAL PRIMARY KEY,
  "customer_id" INTEGER,
  "points" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- cancellations: Cancellation history
CREATE TABLE "cancellations" (
  "id" SERIAL PRIMARY KEY,
  "booking_id" INTEGER NOT NULL,
  "reason" TEXT,
  "cancelled_at" TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

COMMIT;

-- Ready to use with Neon: https://neon.tech/docs/import/import-sample-data