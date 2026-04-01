-- Banking System - Sample Schema for Neon PostgreSQL
-- Compatible with Neon (https://neon.tech)
-- Generated from SDD Academy project data

BEGIN;

-- accounts: Bank accounts
CREATE TABLE "accounts" (
  "id" SERIAL PRIMARY KEY,
  "customer_id" INTEGER NOT NULL,
  "account_number" TEXT NOT NULL,
  "balance_cents" BIGINT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- customers: Customer records
CREATE TABLE "customers" (
  "id" SERIAL PRIMARY KEY,
  "full_name" TEXT NOT NULL,
  "email" TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- transactions: Transaction history
CREATE TABLE "transactions" (
  "id" SERIAL PRIMARY KEY,
  "account_id" INTEGER NOT NULL,
  "amount_cents" BIGINT NOT NULL,
  "kind" TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- transfers: Money transfers
CREATE TABLE "transfers" (
  "id" SERIAL PRIMARY KEY,
  "from_account_id" INTEGER NOT NULL,
  "to_account_id" INTEGER NOT NULL,
  "amount_cents" BIGINT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- loans: Loan accounts
CREATE TABLE "loans" (
  "id" SERIAL PRIMARY KEY,
  "customer_id" INTEGER NOT NULL,
  "principal_cents" BIGINT,
  "rate_percent" NUMERIC(6, 3),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- interest: Interest calculations
CREATE TABLE "interest" (
  "id" SERIAL PRIMARY KEY,
  "loan_id" INTEGER NOT NULL,
  "accrued_cents" BIGINT,
  "as_of" DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

COMMIT;

-- Ready to use with Neon: https://neon.tech/docs/import/import-sample-data