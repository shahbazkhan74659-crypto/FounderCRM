# CLAUDE.md

Rules and instructions for how Claude should work in this repository. The first ever rule is never commit and push anything until the owner says so.

## Project Documentation System

This project uses a strict 6-file Markdown documentation system, each file with **one** distinct responsibility — the same structure and conventions used in the sibling project `C:\RajuApp`:

```text
CLAUDE.md       → Rules and instructions (this file)
PROJECT.md      → Project definition — what we're building, and why
PHASES.md       → Development roadmap — in what order we're building it
TASKS.md        → Current execution — what we're doing right now
ARCHITECTURE.md → System design — how the system works internally
DECISIONS.md    → Technical decision history — why we chose to build it this way
```

Claude must preserve this separation. Do not duplicate large sections across files — if a fact belongs in another file, put it there and reference it instead.

## Mandatory Maintenance Rules

### 1. Responsibility Separation
Keep each file focused on its own responsibility. Do not duplicate large sections across files.

### 2. TASKS.md
Must remain actionable. Tasks should normally belong to a phase defined in `PHASES.md`. Tasks represent concrete work, not vague project goals.

### 3. PHASES.md
Must remain high-level: development stages, milestones, sequencing — **not** individual coding tasks. The project owner determines the number and order of phases. Claude must not arbitrarily restructure the project's phase order or phase count, and must not invent future phases the owner hasn't actually specified. As of this writing (2026-09-13), only Phase 0 (Planning) is defined — do not add Phase 1 or beyond until the owner does.

### 4. ARCHITECTURE.md
Describes the project's actual technical structure — stable system design, relationships, boundaries, data flow, dependencies, architectural patterns. Not a dumping ground for temporary implementation notes. Its "Planned Data Model" section is a pre-code sketch, not a description of anything built — do not let it be read as implemented until real code backs it up (see rule 9).

### 5. DECISIONS.md
Records significant technical decisions and the reasoning behind them. Do not create decision records for trivial coding choices.

### 6. Documentation Accuracy
Update documentation when major project changes make existing documentation inaccurate.

### 7. No Silent Destruction
Never silently modify, delete, or replace important documentation. If a change makes existing documentation obsolete: (1) identify what became obsolete, (2) explain why, (3) determine which file(s) should change, (4) make the update deliberately. Do not casually overwrite historical information.

### 8. Six-File Limit
Do not create additional Markdown documentation files unless information genuinely cannot fit into these six. Assume these six are sufficient by default.

### 9. Actual Project State
Documentation must always reflect the actual project state. Never document a feature, architecture, system, component, or integration as completed when it is not actually implemented. As of this writing (2026-09-13), this project has **no code at all** — it is in Phase 0 (Planning): requirements have been gathered and documented, but no production stack has been chosen and nothing has been built. Keep this note current as later phases land — see `PROJECT.md`'s "Current Status" for the authoritative up-to-date summary.

### 10. Whole-Project Understanding
Together, the six files should let Claude answer "Analyze the whole project" without reading the entire codebase first — but they remain a high-level representation, not a replacement for source code.

## Documentation Conflict Priority

```text
CLAUDE.md
    ↓
PROJECT.md
    ↓
PHASES.md
    ↓
TASKS.md
    ↓
ARCHITECTURE.md
    ↓
DECISIONS.md
```

When information conflicts between documentation files, the higher-priority document governs. **However**, when code and documentation disagree, do not blindly trust the documentation — inspect the code, determine the actual current state, and correct the stale documentation.

## Mandatory Pre-Change Documentation Check

Before making any significant project change, identify which documentation file(s) will become affected or inaccurate as a consequence:

- New project requirement → `PROJECT.md`
- Change in development stage → `PHASES.md`
- New/current implementation work → `TASKS.md`
- Architectural change → `ARCHITECTURE.md`
- Significant technical choice → `DECISIONS.md`
- Change to Claude's working rules → `CLAUDE.md`

A single change may require updates to multiple files.

## Project-Specific Notes

- The repository (`C:\FounderCRM`) currently contains only `Project Docs/` (this documentation system) — no application code has been written and no git repository has been initialized yet.
- The production stack is now locked (2026-09-13 — see `DECISIONS.md`): Vite + React + TypeScript frontend (islands-style, static build), Next.js (API-only) + Node.js backend, single repo/single deploy, Vitest, PostgreSQL (local), Render + UptimeRobot for hosting. Auth approach is explicitly still open. No Phase 1+ roadmap has been locked with the owner yet — see `PHASES.md` and `TASKS.md` for what's next.
- **Do not start any implementation work** (scaffolding a project, writing schema/code) until the owner explicitly locks a Phase 1+ roadmap and resolves the auth approach, the same way `C:\RajuApp` had both settled before any code was written there.
