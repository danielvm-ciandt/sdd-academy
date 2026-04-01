-- HR Management Portal - Sample Schema for Neon PostgreSQL
-- Compatible with Neon (https://neon.tech)
-- Generated from SDD Academy project data

BEGIN;

-- employees: Employee records
CREATE TABLE "employees" (
  "id" SERIAL PRIMARY KEY,
  "department_id" INTEGER,
  "full_name" TEXT NOT NULL,
  "email" TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- departments: Organization departments
CREATE TABLE "departments" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "code" TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- positions: Job positions
CREATE TABLE "positions" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "department_id" INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- payroll: Payroll records
CREATE TABLE "payroll" (
  "id" SERIAL PRIMARY KEY,
  "employee_id" INTEGER NOT NULL,
  "pay_period" TEXT,
  "gross_cents" BIGINT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- benefits: Employee benefits
CREATE TABLE "benefits" (
  "id" SERIAL PRIMARY KEY,
  "employee_id" INTEGER NOT NULL,
  "plan_name" TEXT,
  "active" BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- performance: Performance reviews
CREATE TABLE "performance" (
  "id" SERIAL PRIMARY KEY,
  "employee_id" INTEGER NOT NULL,
  "review_period" TEXT,
  "score" NUMERIC(4, 2),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- leave: Leave requests and history
CREATE TABLE "leave" (
  "id" SERIAL PRIMARY KEY,
  "employee_id" INTEGER NOT NULL,
  "start_date" DATE,
  "end_date" DATE,
  "status" TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

COMMIT;

-- Ready to use with Neon: https://neon.tech/docs/import/import-sample-data