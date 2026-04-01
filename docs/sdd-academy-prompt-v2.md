# SDD Academy — Complete Build Prompt

## Context

I'm the engineering lead at CI&T, a software development company with more then hundreds team members. We follow lean thinking and PMI project structures with agile methodologies. I need a **self-learning website** to help our team adopt Spec-Driven Development (SDD) methodologies using AI-assisted coding tools.

## What to Build

A **training website** (named `sdd-academy`) that serves as a self-learning hub. (same approach as https://rfranco-br.github.io/Intent-Driven-Flow/idf-v7.9.html — use that site as design inspiration: dark theme, clean typography, numbered sections, card-based layouts).

## Site Sections (in order)

### 1. Auth Gate (Neon Auth)
- Login screen that blocks access until authenticated
- Restrict to `@ciandt.com` email domain only
- Use **Neon Auth** (built on Stack Auth) — include configuration placeholders for `projectId` and `publishableClientKey`
- Include a "Dev mode: skip auth" link for local testing
- Reference: https://neon.com/docs/guides/neon-auth

### 2. Sticky Navigation Bar
- Links to all sections below
- Brand: "SDD Academy" with version badge

### 3. Hero Section
- Title: "Spec-Driven Development Academy"
- Subtitle explaining the "pick a method, pick a project, build it yourself" concept
- Meta info: designed for CI&T teams, 9 methods, lean philosophy

### 4. "How It Works" (3 cards)
- Step 1: Choose a Method (browse 9 SDD methods or use the selector)
- Step 2: Choose a Project (10 sample databases from Neon, tiered by complexity)
- Step 3: Build It Yourself (use any AI-assisted IDE — instructions are tool-agnostic)

### 5. Method Selector (Interactive Decision Guide)
A 3-question quiz that recommends methods:
- Q1: Project size? (small / medium / large)
- Q2: How much structure? (minimal / moderate / heavy)
- Q3: What matters most? (speed / quality / flexibility / governance)

Scoring logic:

Show top 3 recommendations with scores. Clicking a recommendation scrolls to that method card.

### 6. Methods Section (9 Method Cards)

Each card must include:
- **Complexity badge** (high/medium/low with color coding)
- **Method name** with a **live version badge** that fetches the latest release/tag from the GitHub API on page load (fallback to "latest" if API fails)
- **Tagline** (10 words)
- **Philosophy** (2-3 sentences)
- **Stats**: total workflow steps, number of phases, number of agents
- **Expandable summary**: agents/roles list, phases, setup commands, "From Zero to Prod" 7-step guide, references
- **"Open Full Guide" button** that opens a full-screen overlay with 4 tabs:
  - **Complete Guide**: the full how-to content (see source files below)
  - **Workflow Table**: all workflow steps from CSV (phase, step order, agent, command, required, output, notes)
  - **From Zero to Prod**: step-by-step with commands
  - **References**: official links, repo, setup commands

#### The 9 Methods and Their Source Data

For each method below, I'm providing the source repository. **You must research each repo** to extract: philosophy, agents/roles, workflow phases, setup commands, CLI commands, and create a "From Zero to Prod" 7-step guide. Also fetch the README and any documentation to create the "Complete Guide" tab content.

1. **BMAD Method** — https://github.com/bmad-code-org/BMAD-METHOD
   - Multi-agent role-play (PM, Architect, Dev, Scrum Master, UX, QA, Analyst)
   - 4 phases: Analysis → Planning → Solutioning → Implementation
   - Complexity: HIGH (~37 workflow steps)
   - Key: `npx bmad-method install`, role-based slash commands

2. **Spec-Kit** — https://github.com/github/spec-kit
   - Constitution-first, spec-driven with multi-step refinement
   - 6 phases: Constitution → Specify → Clarify → Plan → Tasks → Implement
   - Complexity: MEDIUM (~10 steps)
   - Key: `specify init . --ai claude`, `/speckit.*` commands

3. **Get-Shit-Done (GSD)** — https://github.com/gsd-build/get-shit-done
   - Anti-context-rot, fresh 200k-token contexts per task, parallel wave execution
   - 6 phases: Discovery → Discussion → Planning → Execution → Verification → Release
   - Complexity: HIGH (~31 steps including 18 "anytime" commands)
   - Key: `npx get-shit-done-cc@latest`, `/gsd:*` commands

4. **OpenSpec** — https://github.com/Fission-AI/OpenSpec/
   - Fluid, iterative, change-folder-based artifact workflow
   - 5 phases: Propose → Review → Apply → Verify → Archive
   - Complexity: MEDIUM (~8 steps, simplest workflow)
   - Key: `openspec init`, `/opsx:*` commands

5. **AI-SDD** — https://ai-sdd.com/
   - Spec-as-source-of-truth, Director-Executor-Contract model, TDD integrated
   - 6 phases: Steering → Spec Init → Requirements → Design → Tasks → Implement (TDD)
   - Complexity: HIGH (~10 steps with 3 approval gates)
   - Key: `npx ai-sdd`, `/sdd:*` commands

6. **SpecPulse** — https://github.com/specpulse/specpulse
   - CLI-first, 11 identical commands across 8 AI platforms, MoSCoW prioritization
   - 7 phases: Pulse → Spec → Clarify → Plan → Task → Execute → Validate
   - Complexity: MEDIUM (~11 steps)
   - Key: `pip install specpulse`, `/sp-*` commands

7. **Spec-Workflow-MCP** — https://github.com/Pimzino/spec-workflow-mcp
   - MCP-native, natural language (no slash commands), real-time web dashboard
   - 4 phases: Create Spec → Approve Requirements → Approve Design → Execute Tasks
   - Complexity: LOW (~11 steps)
   - Key: `claude mcp add spec-workflow npx @pimzino/spec-workflow-mcp@latest`, conversational interface

8. **ANWS** — https://github.com/Haaaiawd/ANWS
   - Four principles: Axiom, Nexus, Weave, Sovereignty — design-first with adversarial reviews
   - 4 phases: Genesis → Challenge → Blueprint → Forge
   - Complexity: HIGH (~10 steps)
   - Key: `anws init --target claude`, `/genesis`, `/challenge`, `/blueprint`, `/forge`

9. **Taskmaster** — https://www.task-master.dev/
   - PRD-driven, dependency-ordered tasks with topological sorting
   - 5 phases: Write PRD → Parse → Analyze → Expand → Implement
   - Complexity: MEDIUM (~13 steps)
   - Key: `npm install -g task-master-ai`, `task-master init`, `task-master parse-prd`

#### Live Version Badges
For each method, fetch the latest release version from the GitHub API on page load:
```
https://api.github.com/repos/{owner}/{repo}/releases/latest
```
Fallback to tags API if no releases exist. Display as a small badge next to the method name. Link to the release page.

### 7. Projects Section (10 Practice Projects)

Each project uses a **real Neon Postgres sample database** from https://neon.com/docs/import/import-sample-data. Create a project card with: name, Neon source database, complexity tier, table count, record count, installed size, description, and a **build challenge** (what specifically to build with that data).

| # | Project Name | Neon Database | Tier | Tables | Records | Size | Build Challenge |
|---|---|---|---|---|---|---|---|
| 1 | Element Explorer API | Periodic Table | Starter | 1 | 118 | 7.2 MB | REST API with element lookup, filtering by properties, comparison, and quiz endpoint |
| 2 | Happiness Analytics API | World Happiness Index | Starter | 1 | 156 | 7.2 MB | Analytics API with country ranking, regional comparison, correlation analysis |
| 3 | Titanic Survival API | Titanic Passenger Data | Starter | 1 | 1,309 | 7.5 MB | API with passenger lookup, survival statistics by demographic, fare analysis |
| 4 | Content Catalog Engine | Netflix Data | Intermediate | 1 | 8,807 | 11 MB | Content catalog with search, multi-filter, director analytics, recommendation engine |
| 5 | Digital Music Store | Chinook | Intermediate | 11 | 77,929 | 17 MB | Full music store API: browse, playlists, purchases, invoices, sales reports |
| 6 | Video Rental System | Pagila (DVD Rental) | Intermediate | 33 | 62,322 | 15 MB | Complete rental system: checkout/return flow, payments, overdue detection |
| 7 | Brick Catalog Service | Lego Database | Advanced | 8 | 633,250 | 42 MB | Catalog API with theme browsing, part inventory, color analysis, set comparison |
| 8 | HR Management Portal | Employees | Advanced | 6 | 391,901 | 333 MB | HR API with org chart, salary history, title progression, compensation benchmarking |
| 9 | Semantic Search Engine | Wikipedia Vectors | Expert | 1 | 250,000 | 850 MB | Vector similarity search API using pgvector, topic clustering, hybrid search |
| 10 | Flight Booking System | Postgres Air | Expert | 10 | 67,228,600 | 6.7 GB | Full booking system: route search, multi-leg itineraries, seat selection, availability |

Tier colors: Starter=green, Intermediate=blue, Advanced=yellow, Expert=red.

### 8. Tool Compatibility Matrix

A table showing which SDD methods work with which AI-assisted IDEs:

| Method | Claude Code | Cursor | Windsurf | Copilot (VS Code) | Cline | Antigravity | Aider | Continue |
|---|---|---|---|---|---|---|---|---|
| BMAD | Full | Full | Partial | Partial | Partial | Partial | Limited | Limited |
| Spec-Kit | Full | Full | Partial | Partial | Partial | Partial | Limited | Limited |
| GSD | Full | Partial | Limited | Limited | Partial | Limited | Limited | Limited |
| OpenSpec | Full | Full | Partial | Partial | Partial | Partial | Limited | Limited |
| AI-SDD | Full | Full | Partial | Partial | Partial | Partial | Limited | Limited |
| SpecPulse | Full | Full | Full | Full | Full | Full | Full | Full |
| Spec-Workflow-MCP | Full | Full | Full | No MCP | Partial | No MCP | No MCP | No MCP |
| ANWS | Full | Full | Partial | Partial | Partial | Partial | Limited | Limited |
| Taskmaster | Full | Full | Full | Full | Full | Full | Partial | Partial |

Legend: **Full** = native commands work directly, **Partial** = works via adaptation, **Limited/No MCP** = requires workarounds or unsupported.

Below the matrix, include a **tool reference grid** (card per tool) with a 2-sentence description and link:
- **Cursor** — cursor.com — AI-first code editor, Composer, MCP support
- **Claude Code** — docs.anthropic.com — Anthropic's CLI agent, terminal-first, MCP support
- **GitHub Copilot** — github.com/features/copilot — Inline completions, VS Code/JetBrains/Neovim
- **Windsurf** — codeium.com/windsurf — Codeium's AI IDE, Cascade, MCP support
- **Cline** — github.com/cline/cline — Open-source VS Code agent, multi-model, MCP support
- **Antigravity** — antigravity.dev — Enterprise AI coding, large codebase context
- **Aider** — aider.chat — Open-source CLI pair programming, git-aware
- **Continue** — continue.dev — Open-source AI assistant, VS Code/JetBrains, custom models
- **Opencode**

### 9. Team Leader Playbook (6 Strategies)

Cards with step-by-step instructions for team leaders:

1. **Method Deathmatch** — Two devs, different methods, same database, same timebox (4h). Compare results, team votes.
2. **Method of the Month** — One method per month: dedicated Slack channel, weekly office hours, end-of-month showcase.
3. **Teach-Back Sessions** — After completing a method+project combo, present 15-min teach-back to squad.
4. **SDD Leaderboard** — Gamified tiers: Explorer (1 combo), Practitioner (3), Expert (6), Master (9). Monthly recognition.
5. **Challenge of the Week** — Weekly micro-challenge posted Monday: specific method + database + constraint + timebox. Share repos by Friday.
6. **Real Project Pilot** — After practicing 2-3 methods, apply one to a real client sprint with an SDD Expert as coach. Run retro.

### 10. Footer
- "SDD Academy" branding
- "Built for CI&T engineering teams · Lean thinking · Spec-driven development · AI-assisted execution"
- Copyright 2026 CI&T · Hosted on GitHub Pages · Powered by Neon Auth

## Design Requirements

- **Single HTML file** — all CSS and JS inline, no external dependencies except Google Fonts and (optionally) the Stack Auth SDK
- **Dark theme** inspired by https://rfranco-br.github.io/Intent-Driven-Flow/idf-v7.9.html:
  - Background: very dark navy/charcoal (#0d0f14 range)
  - Cards: slightly lighter (#181b24 range)
  - Accent color: warm orange (#e8734a range)
  - Text: light gray (#e8e6e3) with dimmer secondary text
  - Green for code/success, red for expert/high, yellow for warnings, blue for intermediate
- **Typography**: Inter for body, JetBrains Mono for code
- **Responsive**: works on desktop and tablet (mobile is nice-to-have)
- **Interactive elements**: method selector quiz, expandable cards, full-screen overlay for detailed guides, smooth scrolling nav

## Technical Notes

- The site must work as a static file on GitHub Pages — no server-side code
- Neon Auth config should be easily replaceable (clearly marked placeholders)
- The GitHub API version fetching should be non-blocking (load page first, fetch versions async)
- All method content should be embedded in the HTML (no external JSON files)
- The full guide overlay should support keyboard navigation (Escape to close)

## File Output

Produce a single file: `sdd-academy.html` — ready to rename to `index.html` and push to GitHub Pages.
