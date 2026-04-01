# SDD Academy — Self-Learning Platform

## Who I Am

I lead engineering at CI&T, a software company with 350+ team members. We follow lean thinking principles. I need a self-learning website to help our teams adopt **Spec-Driven Development (SDD)** — a family of methodologies where you write specs first and let AI agents generate code from them.

## The Core Concept

**"Pick a method, pick a project, build it yourself."**

Engineers should be able to browse SDD methodologies, choose one that fits their style, pair it with a practice database, and learn by doing — using whichever AI coding tool they prefer (Cursor, Claude Code, Copilot, Windsurf, Cline, Antigravity, Aider, Continue, or others).

## What I Need

A **single HTML file** (all CSS/JS inline) that can be hosted on GitHub Pages. The site should cover:

### 1. The 9 SDD Methods

Research each repository/site below and present each method with enough depth that an engineer can understand the philosophy, see the workflow, and get started. For each method, also fetch the **latest version/release from GitHub** and display it.

| Method | Source | Quick Description |
|--------|--------|-------------------|
| BMAD | https://github.com/bmad-code-org/BMAD-METHOD | Multi-agent role-play (PM, Architect, Dev, etc.) |
| Spec-Kit | https://github.com/github/spec-kit | Constitution-first, spec-driven with refinement loops |
| GSD (Get-Shit-Done) | https://github.com/gsd-build/get-shit-done | Anti-context-rot, fresh contexts per task |
| OpenSpec | https://github.com/Fission-AI/OpenSpec/ | Fluid, iterative, change-folder-based |
| AI-SDD | https://ai-sdd.com/ | Spec-as-source-of-truth, Director-Executor model |
| SpecPulse | https://github.com/specpulse/specpulse | CLI-first, identical commands across 8 AI platforms |
| Spec-Workflow-MCP | https://github.com/Pimzino/spec-workflow-mcp | MCP-native, natural language, real-time dashboard |
| ANWS | https://github.com/Haaaiawd/ANWS | Four principles (Axiom, Nexus, Weave, Sovereignty) |
| Taskmaster | https://www.task-master.dev/ | PRD-driven, dependency-ordered with topological sort |

Each method should have both a summary view and a way to access detailed content (the full workflow, setup commands, a step-by-step "getting started" guide). Decide how to best present this depth.

### 2. 10 Practice Projects

Each project uses a real **Neon Postgres sample database** (from https://neon.com/docs/import/import-sample-data). Present them in a progression from simple to complex:

| Project | Neon Database | Scale | What to Build |
|---------|--------------|-------|---------------|
| Element Explorer API | Periodic Table | 1 table, 118 rows, 7.2 MB | REST API with element lookup and filtering |
| Happiness Analytics API | World Happiness Index | 1 table, 156 rows, 7.2 MB | Analytics with country ranking and correlation |
| Titanic Survival API | Titanic Passenger Data | 1 table, 1,309 rows, 7.5 MB | Survival statistics by demographic |
| Content Catalog Engine | Netflix Data | 1 table, 8,807 rows, 11 MB | Content search, filters, recommendations |
| Digital Music Store | Chinook | 11 tables, 77K rows, 17 MB | Music store: browse, playlists, invoices |
| Video Rental System | Pagila (DVD Rental) | 33 tables, 62K rows, 15 MB | Rental checkout/return flow with payments |
| Brick Catalog Service | Lego Database | 8 tables, 633K rows, 42 MB | Part inventory, theme browsing, set comparison |
| HR Management Portal | Employees | 6 tables, 392K rows, 333 MB | Org chart, salary history, compensation |
| Semantic Search Engine | Wikipedia Vectors | 1 table, 250K rows, 850 MB | Vector search with pgvector, topic clustering |
| Flight Booking System | Postgres Air | 10 tables, 67M rows, 6.7 GB | Multi-leg booking, seat selection, availability |

### 3. A Method Selector

Some kind of interactive guide that helps engineers pick the right SDD method for their situation. It should consider factors like project size, desired level of structure, and what they value most (speed, quality, flexibility, governance). You decide the format — quiz, flowchart, interactive filter, or whatever works best.

### 4. Tool Compatibility

Show which SDD methods work with which AI coding tools. The 8 tools to cover: Claude Code, Cursor, Windsurf, Copilot, Cline, Antigravity, Aider, Continue. Support levels vary — some methods have native slash commands that only work in certain tools, while others (like SpecPulse) are CLI-based and work everywhere.

### 5. Team Leader Playbook

Strategies for team leaders to drive adoption across squads. Include ideas like:

- Competitive formats (two devs, different methods, same project, compare results)
- Month-long deep dives on one method
- Teach-back sessions after completing a method+project combo
- Gamification / progression tiers
- Weekly micro-challenges
- Applying a method to a real client project after practice

Feel free to add or reframe these based on what you think would drive adoption best.

### 6. Access Control

The site should use **Neon Auth** (built on Stack Auth — see https://neon.com/docs/guides/neon-auth) to restrict access to `@ciandt.com` emails only. Include a dev-mode bypass for local testing. Use configuration placeholders so I can plug in my actual keys later.

## Design Direction

- Dark theme (the site at https://rfranco-br.github.io/Intent-Driven-Flow/idf-v7.9.html is a good reference for the vibe — dark background, clean typography, card-based layout — but don't copy it exactly)
- Should feel modern, professional, and developer-oriented
- Must work on desktop and tablet at minimum

## What I Care About

- **Content depth**: don't just list method names — engineers should be able to understand what each method does and how to start using it, without leaving the site
- **Tool-agnostic framing**: every instruction should work regardless of which AI IDE someone uses
- **Lean thinking**: CI&T runs on lean principles — frame the learning journey through that lens where it makes sense
- **Self-contained**: single HTML file, no external dependencies beyond CDN fonts/libraries

## Output

One file: `sdd-academy.html`
