-- Real-Time Chat Application - Sample Schema for Neon PostgreSQL
-- Compatible with Neon (https://neon.tech)
-- Generated from SDD Academy project data

BEGIN;

-- users: User accounts
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" TEXT NOT NULL,
  "display_name" TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- conversations: Chat conversations
CREATE TABLE "conversations" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT,
  "created_by_user_id" INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- messages: Chat messages
CREATE TABLE "messages" (
  "id" SERIAL PRIMARY KEY,
  "sender_id" INTEGER NOT NULL,
  "recipient_id" INTEGER NOT NULL,
  "body" TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- attachments: Message attachments
CREATE TABLE "attachments" (
  "id" SERIAL PRIMARY KEY,
  "message_id" INTEGER NOT NULL,
  "url" TEXT NOT NULL,
  "mime_type" TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- presence: User online status
CREATE TABLE "presence" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "status" TEXT DEFAULT 'offline',
  "last_seen_at" TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

COMMIT;

-- Ready to use with Neon: https://neon.tech/docs/import/import-sample-data