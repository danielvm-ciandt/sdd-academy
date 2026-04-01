-- Social Network Platform - Sample Schema for Neon PostgreSQL
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

-- posts: User posts
CREATE TABLE "posts" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "body" TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- comments: Post comments
CREATE TABLE "comments" (
  "id" SERIAL PRIMARY KEY,
  "post_id" INTEGER NOT NULL,
  "user_id" INTEGER NOT NULL,
  "body" TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- likes: Post and comment likes
CREATE TABLE "likes" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "post_id" INTEGER,
  "comment_id" INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- follows: User follow relationships
CREATE TABLE "follows" (
  "id" SERIAL PRIMARY KEY,
  "follower_id" INTEGER NOT NULL,
  "followed_id" INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- messages: Direct messages
CREATE TABLE "messages" (
  "id" SERIAL PRIMARY KEY,
  "sender_id" INTEGER NOT NULL,
  "recipient_id" INTEGER NOT NULL,
  "body" TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- notifications: User notifications
CREATE TABLE "notifications" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "kind" TEXT,
  "payload" TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

COMMIT;

-- Ready to use with Neon: https://neon.tech/docs/import/import-sample-data