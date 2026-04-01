-- Recommendation Engine - Sample Schema for Neon PostgreSQL
-- Compatible with Neon (https://neon.tech)
-- Generated from SDD Academy project data

BEGIN;

-- users: User profiles
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" TEXT NOT NULL,
  "display_name" TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- items: Products or content
CREATE TABLE "items" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "category" TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- interactions: User-item interactions
CREATE TABLE "interactions" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "item_id" INTEGER NOT NULL,
  "event_type" TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- recommendations: Generated recommendations
CREATE TABLE "recommendations" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "item_id" INTEGER NOT NULL,
  "score" DOUBLE PRECISION,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

COMMIT;

-- Ready to use with Neon: https://neon.tech/docs/import/import-sample-data