-- Project Management Tool - Sample Schema for Neon PostgreSQL
-- Compatible with Neon (https://neon.tech)
-- Generated from SDD Academy project data

BEGIN;

-- projects: Projects
CREATE TABLE "projects" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "slug" TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- tasks: Project tasks
CREATE TABLE "tasks" (
  "id" SERIAL PRIMARY KEY,
  "project_id" INTEGER NOT NULL,
  "title" TEXT NOT NULL,
  "status" TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- teams: Team information
CREATE TABLE "teams" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- members: Team members
CREATE TABLE "members" (
  "id" SERIAL PRIMARY KEY,
  "team_id" INTEGER NOT NULL,
  "user_id" INTEGER NOT NULL,
  "role" TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- assignments: Task assignments
CREATE TABLE "assignments" (
  "id" SERIAL PRIMARY KEY,
  "task_id" INTEGER NOT NULL,
  "assignee_user_id" INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- timelines: Project timelines
CREATE TABLE "timelines" (
  "id" SERIAL PRIMARY KEY,
  "project_id" INTEGER NOT NULL,
  "milestone" TEXT,
  "due_at" TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

-- comments: Task comments
CREATE TABLE "comments" (
  "id" SERIAL PRIMARY KEY,
  "post_id" INTEGER NOT NULL,
  "user_id" INTEGER NOT NULL,
  "body" TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INSERT sample data here based on your project requirements

COMMIT;

-- Ready to use with Neon: https://neon.tech/docs/import/import-sample-data