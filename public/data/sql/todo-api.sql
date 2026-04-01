-- Todo API - Sample Schema for Neon PostgreSQL
-- Compatible with Neon (https://neon.tech)
-- Generated from SDD Academy project data

BEGIN;

-- users: User accounts
CREATE TABLE "users" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);


-- tasks: Todo tasks
CREATE TABLE "tasks" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES "users" (id),
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO "users" (id, email, name) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'alice@example.com', 'Alice'),
  ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'bob@example.com', 'Bob'),
  ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'carol@example.com', 'Carol');

INSERT INTO "tasks" (id, user_id, title, completed) VALUES
  ('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Set up database', false),
  ('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Write API tests', true),
  ('f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Review PR', false),
  ('a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a77', 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Deploy to staging', false);

COMMIT;

-- Ready to use with Neon: https://neon.tech/docs/import/import-sample-data