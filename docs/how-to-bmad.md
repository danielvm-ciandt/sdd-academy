# How to Implement Features with BMAD Method

**Source:** https://github.com/bmad-code-org/BMAD-METHOD
**Docs:** https://docs.bmad-method.org
**Philosophy:** Multi-agent role-play (PM, Architect, Dev, Scrum Master) with scale-adaptive intelligence. Progressive context building across 4 phases -- each phase produces documents that inform the next, so agents always know what to build and why.

---

## Prerequisites

- Node.js v20+
- Git
- AI IDE (Claude Code, Cursor, Windsurf, Copilot, etc.)

## Key Concepts

- **Agents** are specialized personas (skill IDs like `bmad-pm`, `bmad-dev`) invoked as skills. Each agent has a menu with **triggers** (short codes like `CP`, `DS`).
- **Workflows** (like `bmad-create-prd`, `bmad-dev-story`) can be run directly as skills OR through an agent's menu trigger.
- **`bmad-help`** is available at any time to tell you what to do next. It also evolves when extended modules are installed, so it always knows everything available in your project. It runs automatically at the end of every workflow to tell you exactly what to do next.
- **`project-context.md`** is a recommended file that acts as a constitution for your project -- guiding implementation decisions across all workflows. Generate it via `bmad-generate-project-context` or create it manually at `_bmad-output/project-context.md`.
- **Fresh chats:** Always start a fresh chat for each workflow. This prevents context limitations from causing issues.

### Planning Tracks

| Track | Best For | Documents Created |
|---|---|---|
| Quick Flow | Bug fixes, simple features, clear scope (1-15 stories) | Tech-spec only |
| BMad Method | Products, platforms, complex features (10-50+ stories) | PRD + Architecture + UX |
| Enterprise | Compliance, multi-tenant systems (30+ stories) | PRD + Architecture + Security + DevOps |

### Agents Reference

| Agent | Skill ID | Triggers | Primary Workflows |
|---|---|---|---|
| Analyst (Mary) | `bmad-analyst` | BP, RS, CB, WB, DP | Brainstorm, Research, Create Brief, PRFAQ Challenge, Document Project |
| Product Manager (John) | `bmad-pm` | CP, VP, EP, CE, IR, CC | Create/Validate PRD, Create Epics+Stories, Readiness Check |
| Architect (Winston) | `bmad-architect` | CA, IR | Create Architecture, Implementation Readiness |
| Scrum Master (Bob) | `bmad-sm` | SP, CS, ER, CC | Sprint Planning, Create Story, Retrospective |
| Developer (Amelia) | `bmad-dev` | DS, CR | Dev Story, Code Review |
| QA Engineer (Quinn) | `bmad-qa` | QA | Generate E2E/API tests (`bmad-qa-generate-e2e-tests`) |
| Quick Flow (Barry) | `bmad-master` | QD, CR | Quick Dev, Code Review |
| UX Designer (Sally) | `bmad-ux-designer` | CU | Create UX Design |
| Technical Writer (Paige) | `bmad-tech-writer` | DP, WD, US, MG, VD, EC | Document Project, Write Document, Update Standards, Mermaid Generate, Validate Doc, Explain Concept |

---

## Project Setup

```bash
mkdir my-project && cd my-project
git init
npx bmad-method install
# Select: your AI tool (e.g., Claude Code)
# Select: All modules for full workflow
```

```bash
git add .
git commit -m "chore: initialize project with BMAD Method"
git remote add origin <your-repo-url>
git push -u origin main
```

Verify installation inside your AI IDE:

```
bmad-help
```

---

## Quick Flow (Parallel Track)

For small, well-understood work that doesn't need full planning and solutioning, use the Quick Flow to skip Phases 1-3 entirely:

```
bmad-master
```

Select `QD` (Quick Dev). Or run directly:

```
bmad-quick-dev
```

This unified workflow clarifies intent, plans, implements, reviews, and presents -- all in one pass.

**Produces:** `spec-*.md` + working code.

Use this when the change is small enough that a full PRD/Architecture/Epic cycle would be overkill. For the full method, continue below.

---

## Step 1: Create Your Plan (Phases 1-3)

Phases 1-3 are done **once for the entire project**, covering all features. Each workflow should run in a fresh chat.

### Phase 1: Analysis (Optional)

If you're starting from a vague idea rather than clear requirements, use Phase 1 to explore the problem space before committing to planning.

Load the Analyst agent:

```
bmad-analyst
```

| Step | Trigger | Workflow | Produces |
|---|---|---|---|
| Brainstorm ideas | `BP` | `bmad-brainstorming` | `brainstorming-report.md` |
| Research assumptions | `RS` | `bmad-domain-research`, `bmad-market-research`, `bmad-technical-research` | Research findings |
| Capture strategic vision | `CB` | `bmad-product-brief` | `product-brief.md` |
| Stress-test product concept | `WB` | `bmad-prfaq` | `prfaq-{project}.md` |

Skip this phase if you already have clear requirements and jump straight to Phase 2.

### Phase 2: Planning (Required)

Define what to build and for whom. The PRD should cover **all features** for the project.

Load the PM agent in a fresh chat:

```
bmad-pm
```

From the PM menu, select `CP` (Create PRD). Describe **all** your requirements:

> "Build a task board app. FR-01: Users can register with email and password, system validates input, hashes password, stores user, returns JWT, rejects duplicate emails. FR-02: Users can create, rename, and delete boards, each board belongs to one user, list boards for authenticated user. FR-03: Users receive real-time notifications via WebSocket when a card assigned to them changes status."

Alternatively, run the workflow directly as a skill:

```
bmad-create-prd
```

**Produces:** `_bmad-output/PRD.md` with functional requirements, non-functional requirements, acceptance criteria for the entire project.

#### UX Design (Optional -- when UI matters)

If the project has a user-facing interface, design the experience after creating the PRD. In a fresh chat:

```
bmad-ux-designer
```

Select `CU` (Create UX Design). Or run directly:

```
bmad-create-ux-design
```

**Produces:** `_bmad-output/ux-spec.md` with user flows, wireframe descriptions, and interaction patterns.

Skip this step for backend-only projects.

### Phase 3: Solutioning

Decide how to build it and break work into stories. All workflows in this phase use the PRD (and UX spec if created) as input.

#### Create Architecture

In a fresh chat, load the Architect agent:

```
bmad-architect
```

Select `CA` (Create Architecture). Or run the workflow directly:

```
bmad-create-architecture
```

**Produces:** `_bmad-output/architecture.md` with tech stack decisions, data model, API contracts, and ADRs covering the entire project.

#### Generate Project Context (Recommended)

After architecture is created, generate the project context file:

```
bmad-generate-project-context
```

**Produces:** `_bmad-output/project-context.md` -- ensures all AI agents follow your project's rules and preferences throughout implementation.

#### Create Epics and Stories

In a fresh chat, return to the PM agent to decompose **all** requirements into implementable work:

```
bmad-pm
```

Select `CE` (Create Epics and Stories). Or run directly:

```
bmad-create-epics-and-stories
```

This workflow uses both the PRD and Architecture to create technically-informed stories. Stories are better quality because architecture decisions (database, API patterns, tech stack) directly affect how work should be broken down.

**Produces:** Epic files with stories under `_bmad-output/` -- covering all features (FR-01, FR-02, FR-03, etc.).

#### Implementation Readiness Gate (Highly Recommended)

In a fresh chat, check whether the project is ready for implementation:

```
bmad-check-implementation-readiness
```

Or via PM (`IR`) or Architect (`IR`). Validates cohesion across all planning documents. Returns **PASS**, **CONCERNS**, or **FAIL**. If it fails, revisit earlier phases to fix the gaps before proceeding.

---

## Step 2: Build Your Project (Phase 4)

Once planning is complete, move to implementation. Each workflow should run in a fresh chat. You build **story by story**, not feature by feature.

### Initialize Sprint Planning (once per project)

Load the Scrum Master to initialize sprint tracking:

```
bmad-sm
```

Select `SP` (Sprint Planning). Or run directly:

```
bmad-sprint-planning
```

**Produces:** `sprint-status.yaml` to track all epics and stories through the dev cycle.

### The Build Cycle

For each story, repeat this cycle in fresh chats:

| Step | Agent | Workflow | Purpose | Required? |
|---|---|---|---|---|
| 1 | SM (Bob) | `bmad-create-story` | Create story file from epic | Yes |
| 2 | DEV (Amelia) | `bmad-dev-story` | Implement the story | Yes |
| 3 | DEV (Amelia) | `bmad-code-review` | Quality validation | Recommended |

After all stories in an epic are complete:

| Step | Agent | Workflow | Purpose | Required? |
|---|---|---|---|---|
| 4 | QA (Quinn) | `bmad-qa-generate-e2e-tests` | Generate E2E/API tests for the epic | Optional |
| 4 alt | TEA (Murat) | TEA workflows (test-design, automate, trace) | Risk-based testing with traceability (TEA module) | Optional |

#### Example: Story 1 -- User Registration Endpoint

**Create the story** (fresh chat):

```
bmad-create-story
```

**Produces:** `story-user-registration.md` with focused implementation context, acceptance criteria, and technical notes.

**Implement the story** (fresh chat):

```
bmad-dev-story
```

The Dev agent reads the story file and implements: endpoint, validation, password hashing, JWT generation, and tests.

**Produces:** Working code + tests.

**Code review** (fresh chat):

```
bmad-code-review
```

**Produces:** Approved or changes requested. If changes are requested, go back to `bmad-dev-story`.

**Commit:**

```bash
git add .
git commit -m "feat(auth): add user registration (FR-01)"
git push
```

#### Example: Story 2 -- Board CRUD

Repeat the same cycle:

```
bmad-create-story    # creates story-board-management.md
bmad-dev-story       # implements board CRUD
bmad-code-review     # validates quality
```

```bash
git add .
git commit -m "feat(boards): add board management (FR-02)"
git push
```

#### Example: Story 3 -- Real-time Notifications

```
bmad-create-story    # creates story-notifications.md
bmad-dev-story       # implements WebSocket notifications
bmad-code-review     # validates quality
```

```bash
git add .
git commit -m "feat(notifications): add real-time notifications (FR-03)"
git push
```

### Testing (Optional -- after epic completion)

BMad provides two testing paths. Use one, both, or neither depending on project needs.

**Quinn (built-in QA agent)** -- fast test generation for small-medium projects. After all stories in an epic are implemented and code-reviewed:

```
bmad-qa-generate-e2e-tests
```

Quinn detects your test framework, identifies features, generates E2E/API tests, runs them, and fixes failures. No setup or additional module required.

**Produces:** Working test suite + test summary.

**TEA module (optional, separate install)** -- enterprise-grade test strategy for projects that need risk-based prioritization, requirements traceability, or formal quality gates. TEA integrates at two points:

- **Phase 3 (once):** After architecture, run `test-design` (system-level), `framework`, and `ci` to scaffold test infrastructure.
- **Phase 4 (per epic):** Run `test-design` (epic-level), then `atdd` (optional, before dev), `automate` (after dev), `test-review` (optional audit), and `trace` (coverage matrix).
- **Release gate:** Run `nfr-assess` and `trace` Phase 2 for a PASS/CONCERNS/FAIL/WAIVED gate decision.

Install TEA via `npx bmad-method install` and select the TEA module. See [TEA documentation](https://bmad-code-org.github.io/bmad-method-test-architecture-enterprise/) for details.

### Supporting Workflows (as needed)

These workflows can be used at any point during the build cycle:

**Sprint Status** -- track progress and story status:

```
bmad-sprint-status
```

**Correct Course** -- handle significant mid-sprint changes (scope change, blocking dependency, pivoted requirements):

```
bmad-correct-course
```

**Produces:** Updated plan or re-routing decision. Use this instead of just pushing through when the original plan no longer fits.

**Party Mode** -- bring multiple agent personas into one session to discuss tradeoffs, brainstorm, or conduct post-mortems:

```
bmad-party-mode
```

**Epic Retrospective** -- review after completing all stories in an epic:

```
bmad-sm
```

Select `ER` (Epic Retrospective). Or run directly:

```
bmad-retrospective
```

**Produces:** Lessons learned from the implementation cycle.

---

## Release

After all stories are implemented and reviewed:

```bash
gh pr create \
  --title "Release 1.0.0 -- User Registration, Boards, Notifications" \
  --body "## Summary
- FR-01: User registration with JWT
- FR-02: Board CRUD operations
- FR-03: Real-time notifications via WebSocket

## BMAD Artifacts
- PRD.md, architecture.md (with ADRs), epic/story files
- sprint-status.yaml tracking all stories
- Implementation readiness gate passed
- Code review approved for all stories"
```

After PR approval and merge:

```bash
git checkout main && git pull
git tag v1.0.0
git push --tags
```

---

## BMAD Artifacts

After completing the full workflow, your project should contain:

```
your-project/
├── _bmad/                              # BMad configuration
├── _bmad-output/
│   ├── planning-artifacts/
│   │   ├── PRD.md                      # Requirements (all features)
│   │   ├── architecture.md             # Technical decisions + ADRs
│   │   ├── ux-spec.md                  # UX design (if applicable)
│   │   └── epics/                      # Epic and story files
│   ├── implementation-artifacts/
│   │   └── sprint-status.yaml          # Sprint tracking
│   └── project-context.md              # Implementation rules (recommended)
└── src/                                # Your working code
```

---

## Sequence Diagram

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant Analyst as bmad-analyst
    participant PM as bmad-pm
    participant UX as bmad-ux-designer
    participant Arch as bmad-architect
    participant TEA as bmad-tea
    participant SM as bmad-sm
    participant DevAgent as bmad-dev
    participant QA as bmad-qa
    participant FS as Filesystem
    participant Git as Git/GitHub

    Dev->>Dev: bmad-help (get guidance)

    Note over Dev,Git: Phase 1 - Analysis (all steps optional)

    opt Explore problem space
        Dev->>Analyst: bmad-brainstorming
        Analyst->>FS: Write brainstorming-report.md
        Dev->>Analyst: bmad-domain-research / bmad-market-research
        Analyst->>FS: Write research findings
        Dev->>Analyst: bmad-product-brief
        Analyst->>FS: Write product-brief.md
        Dev->>Analyst: bmad-prfaq (stress-test concept)
        Analyst->>FS: Write prfaq-{project}.md
    end

    Note over Dev,Git: Phase 2 - Planning

    Dev->>PM: bmad-create-prd
    Dev-->>PM: Describe ALL requirements (FR-01, FR-02, FR-03)
    PM->>FS: Write _bmad-output/PRD.md

    opt Has user-facing UI
        Dev->>UX: bmad-create-ux-design
        UX->>FS: Write _bmad-output/ux-spec.md
    end

    Note over Dev,Git: Phase 3 - Solutioning

    Dev->>Arch: bmad-create-architecture
    Arch->>FS: Write _bmad-output/architecture.md + ADRs

    opt Recommended
        Dev->>Dev: bmad-generate-project-context
        Dev->>FS: Write _bmad-output/project-context.md
    end

    Dev->>PM: bmad-create-epics-and-stories
    PM->>FS: Write ALL epic files with stories

    opt TEA module installed (Enterprise/Method tracks)
        Dev->>TEA: test-design (system-level)
        TEA->>FS: Write test-design-system.md
        Dev->>TEA: framework + ci (once per project)
        TEA->>FS: Scaffold test infrastructure + CI pipeline
    end

    opt Recommended
        Dev->>Arch: bmad-check-implementation-readiness
        Arch-->>Dev: PASS / CONCERNS / FAIL
    end

    Note over Dev,Git: Phase 4 - Implementation (story by story)

    Dev->>SM: bmad-sprint-planning (once)
    SM->>FS: Write sprint-status.yaml

    loop For each story
        Dev->>SM: bmad-create-story
        SM->>FS: Write story-[slug].md

        Dev->>DevAgent: bmad-dev-story
        DevAgent->>FS: Read story, implement code + tests

        opt Recommended
            Dev->>DevAgent: bmad-code-review
            DevAgent-->>Dev: Approved / Changes requested
        end

        Dev->>Git: git add . && git commit
    end

    opt After epic is complete - generate tests
        Dev->>QA: bmad-qa-generate-e2e-tests
        QA->>FS: Generate + verify E2E/API tests
    end

    opt TEA module - per-epic testing cycle
        Dev->>TEA: test-design (epic-level risk plan)
        TEA->>FS: Write test-design-epic-N.md
        Dev->>TEA: atdd (before dev, optional)
        Dev->>TEA: automate (after dev)
        Dev->>TEA: test-review (audit quality, optional)
        Dev->>TEA: trace (refresh coverage matrix)
    end

    opt As needed
        Dev->>Dev: bmad-sprint-status
        Dev->>Dev: bmad-correct-course (mid-sprint changes)
    end

    opt After each epic
        Dev->>SM: bmad-retrospective
    end

    Note over Dev,Git: Release

    opt TEA module - release gate
        Dev->>TEA: nfr-assess (if not done earlier)
        Dev->>TEA: trace Phase 2 (gate decision)
        TEA-->>Dev: PASS / CONCERNS / FAIL / WAIVED
    end

    Dev->>Git: gh pr create
    Dev->>Git: merge + git tag v1.0.0
```

---

## Process Diagram

```mermaid
flowchart TD
    Start([Project Init]) --> Install["npx bmad-method install"]
    Install --> GitInit["git init + initial commit"]
    GitInit --> HelpCheck["bmad-help (verify + guidance)"]

    HelpCheck --> TrackCheck{Planning track?}
    TrackCheck -->|Quick Flow| QuickFlow["bmad-quick-dev (skip to code)"]
    TrackCheck -->|BMad Method / Enterprise| P1_Check{Need exploration?}

    P1_Check -->|"Yes (optional)"| P1_Start
    P1_Check -->|No, clear requirements| PRD

    subgraph P1 [Phase 1: Analysis - All Steps Optional]
        P1_Start["Explore problem space"] --> Brainstorm["bmad-brainstorming"]
        Brainstorm --> Research["bmad-domain/market/technical-research"]
        Research --> Brief["bmad-product-brief"]
        Brief --> PRFAQ["bmad-prfaq (optional)"]
    end

    PRFAQ --> PRD

    subgraph P2 [Phase 2: Planning]
        PRD["bmad-create-prd (ALL features)"]
        PRD --> UXCheck{Has UI?}
        UXCheck -->|"Yes (optional)"| UXDesign["bmad-create-ux-design"]
        UXCheck -->|No| P3_Start
        UXDesign --> P3_Start
    end

    subgraph P3 [Phase 3: Solutioning]
        P3_Start["Start solutioning"] --> Arch["bmad-create-architecture"]
        Arch --> ProjCtx["bmad-generate-project-context (recommended)"]
        ProjCtx --> Epics["bmad-create-epics-and-stories (ALL)"]
        Epics --> TEAPhase3{TEA module?}
        TEAPhase3 -->|"Yes (optional)"| TEADesign["TEA: test-design (system-level)"]
        TEADesign --> TEAInfra["TEA: framework + ci (once)"]
        TEAInfra --> Gate
        TEAPhase3 -->|No| Gate
        Gate["bmad-check-implementation-readiness (recommended)"]
        Gate --> GateResult{Ready?}
        GateResult -->|FAIL/CONCERNS| PRD
    end

    GateResult -->|PASS| SprintPlan

    subgraph P4 [Phase 4: Implementation - Story by Story]
        SprintPlan["bmad-sprint-planning (once)"]

        SprintPlan --> StoryLoop

        subgraph StoryLoop [Repeat for each story]
            direction TB
            CreateStory["bmad-create-story"] --> DevStory["bmad-dev-story"]
            DevStory --> CodeReview["bmad-code-review (recommended)"]
            CodeReview --> ReviewResult{Approved?}
            ReviewResult -->|Changes| DevStory
            ReviewResult -->|Yes| Commit["git commit"]
        end

        Commit --> MoreStories{More stories?}
        MoreStories -->|Yes| CreateStory
        MoreStories -->|No| EpicDone

        EpicDone["Epic complete"] --> TestChoice{Generate tests?}
        TestChoice -->|"Quinn (optional)"| QATests["bmad-qa-generate-e2e-tests"]
        TestChoice -->|"TEA (optional)"| TEAEpic["TEA: test-design + automate + trace (per epic)"]
        TestChoice -->|Skip| Retro
        QATests --> Retro
        TEAEpic --> Retro

        Retro["bmad-retrospective (optional)"]
    end

    QuickFlow --> Release
    Retro --> Release

    subgraph ReleaseGate [Release]
        Release["gh pr create"]
        Release --> TEAGate{TEA module?}
        TEAGate -->|"Yes (optional)"| TEARelease["TEA: nfr-assess + trace gate"]
        TEARelease --> TEAResult{"Gate decision"}
        TEAResult -->|PASS| MergeReview
        TEAResult -->|"FAIL/CONCERNS"| StoryLoop
        TEAGate -->|No| MergeReview
        MergeReview{PR Review}
        MergeReview -->|Approved| Merge["Merge + git tag v1.0.0"]
        MergeReview -->|Changes Requested| StoryLoop
    end

    Merge --> Done([Release 1.0.0])
```
