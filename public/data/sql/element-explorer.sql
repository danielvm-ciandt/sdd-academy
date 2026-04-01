-- Element Explorer API - Sample Schema for Neon PostgreSQL
-- Compatible with Neon (https://neon.tech)
-- Generated from SDD Academy project data

BEGIN;

-- elements: Periodic table of elements
CREATE TABLE "elements" (
  id INTEGER PRIMARY KEY,
  symbol TEXT NOT NULL,
  name TEXT NOT NULL,
  atomic_number INTEGER NOT NULL,
  atomic_mass DOUBLE PRECISION NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO "elements" (id, symbol, name, atomic_number, atomic_mass, category) VALUES
  (1, 'H', 'Hydrogen', 1, 1.008, 'nonmetal'),
  (2, 'He', 'Helium', 2, 4.0026, 'noble gas'),
  (3, 'Li', 'Lithium', 3, 6.94, 'alkali metal'),
  (4, 'C', 'Carbon', 6, 12.011, 'nonmetal'),
  (5, 'Fe', 'Iron', 26, 55.845, 'transition metal');

COMMIT;

-- Ready to use with Neon: https://neon.tech/docs/import/import-sample-data