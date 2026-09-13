# Current Tasks

## Active

None actively in progress.

## Next

**Full roadmap locked (2026-09-13): Phase 0 through Phase 24.** Every phase's scope is documented in `PHASES.md` — not duplicated here, per this project's own responsibility-separation rule (`CLAUDE.md` rule 1). **None have been executed yet.** Execution starts only when the owner explicitly says so, phase by phase, in order.

Two things worth calling out because they cut across multiple phases:
- Most feature phases follow a backend → static frontend → wiring pattern, and most wiring phases explicitly defer real role-based permission enforcement to Phase 21, which resolves it everywhere at once.
- Phase 8's detailed endpoints/schema/logic, specifically, are left for the owner to specify when that phase starts (its `PHASES.md` entry only has a minimal scope).

Still **not yet** resolved:
- Any Phase 25+ roadmap — per the owner's explicit instruction (2026-09-13) and `CLAUDE.md` rule 3, `PHASES.md` may only be changed with the owner's explicit allowance; do not add to it unprompted.
- **Email delivery mechanism** for invite links and password-reset links (Phase 23) — not decided anywhere in this project yet; links are handled manually for now.

## Blocked

None.

## Completed

- [x] [Phase 0a] Gathered the core feature set and requirements directly from the owner: Admin/Staff roles and their permission boundaries, the founder-creation rule (any user), the competitor-data edit request/approval workflow, the Interview module's fields (notes, defined-question responses, date/time/count), analytics priorities (Budget Range, Feature Requests) with export marked as deferred, competitor pricing-history and future-pricing-comparison requirements, and the decision to defer both file storage and the database engine choice until after local development — 2026-09-13. See `PROJECT.md` and `DECISIONS.md`.
- [x] Set up this project's documentation system (`Project Docs/` — `CLAUDE.md`, `PROJECT.md`, `PHASES.md`, `TASKS.md`, `ARCHITECTURE.md`, `DECISIONS.md`), mirroring `C:\RajuApp`'s structure and conventions, populated with the requirements gathered above rather than left as an empty template — 2026-09-13. See `DECISIONS.md`'s "Documentation system" entry.
- [x] Stack-lock conversation with the owner: production stack (Vite + React + TypeScript frontend, Next.js API-only + Node.js backend, single repo/single deploy, Vitest), database engine (PostgreSQL, local), and hosting (Render + UptimeRobot) — 2026-09-13. Auth approach explicitly left open. See `DECISIONS.md`.
