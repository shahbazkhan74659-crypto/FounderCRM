# Current Tasks

## Active

None actively in progress. Phase 3 and Phase 1b are done, and the DB↔backend↔frontend wiring/single-port exception (see Completed) is done; Phase 4 is next.

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

- [x] [Out-of-order exception, before Phase 4] Connected the backend to the local Postgres database and wired dev-mode single-port serving, per the owner's explicit instruction (2026-09-14) — see `PHASES.md`'s "Out-of-order exception" note and `DECISIONS.md`. Specifically:
  - **Phase 1b (migration tooling)**: chose `node-pg-migrate` + `pg`; added `server/migrations/`, `server/lib/db.ts` (shared `pg.Pool`), and `npm run migrate:up`/`migrate:down`/`migrate:create` scripts (verified with `--dry-run`). No schema/tables created — still Phase 5's job.
  - **DB connectivity**: `GET /api/health` now also runs `SELECT 1` against Postgres and reports `db: "connected"`/`"error"` — verified locally (200 with `db: "connected"`).
  - **Single port (dev only)**: `server/next.config.ts` proxies non-API requests to the Vite dev server (`http://localhost:5173`) via a rewrite fallback; `frontend/vite.config.ts` pins the HMR websocket to connect directly to Vite; a root `package.json` (`concurrently`) runs both dev servers via one `npm run dev`. Verified: `http://localhost:3000` serves both the frontend placeholder and `/api/health`. Production single-port serving (`frontend/dist` → `server/public`) explicitly deferred, not done now.
- [x] [Phase 3a] Scaffolded the Vite + React + TypeScript frontend (`frontend/`, `npm create vite@latest -- --template react-ts`), replaced the template's demo content with a minimal placeholder page, and verified it end to end (`npm run dev`, `npm run build` → `frontend/dist`, `npm run lint`) — 2026-09-14. No wiring to the Phase 2 backend/API, no copying `dist` into `server/public`, and no real screens/components, per Phase 3's locked scope. See `PHASES.md`.
- [x] [Phase 2a] Scaffolded the Next.js API-only backend (`server/`, TypeScript, App Router, npm), stripped page-rendering artifacts, added `GET /api/health`, and verified it end to end (`npm run dev` + curl, `npm run build`, `npm run lint`) — 2026-09-13. No database wiring, real routes, frontend, or auth, per Phase 2's locked scope. See `PHASES.md`.
- [x] [Phase 1a] Confirmed local PostgreSQL 18 is installed and running (Windows service), created the local `foundercrm` database via `psql`, and confirmed connectivity and the connection-string/env-var convention for later phases (`DATABASE_URL`-style, matching `RajuApp`) — 2026-09-13. No tables and no migration tool were set up (1b deliberately not started, per the owner's instruction). See `PHASES.md`.
- [x] [Phase 0a] Gathered the core feature set and requirements directly from the owner: Admin/Staff roles and their permission boundaries, the founder-creation rule (any user), the competitor-data edit request/approval workflow, the Interview module's fields (notes, defined-question responses, date/time/count), analytics priorities (Budget Range, Feature Requests) with export marked as deferred, competitor pricing-history and future-pricing-comparison requirements, and the decision to defer both file storage and the database engine choice until after local development — 2026-09-13. See `PROJECT.md` and `DECISIONS.md`.
- [x] Set up this project's documentation system (`Project Docs/` — `CLAUDE.md`, `PROJECT.md`, `PHASES.md`, `TASKS.md`, `ARCHITECTURE.md`, `DECISIONS.md`), mirroring `C:\RajuApp`'s structure and conventions, populated with the requirements gathered above rather than left as an empty template — 2026-09-13. See `DECISIONS.md`'s "Documentation system" entry.
- [x] Stack-lock conversation with the owner: production stack (Vite + React + TypeScript frontend, Next.js API-only + Node.js backend, single repo/single deploy, Vitest), database engine (PostgreSQL, local), and hosting (Render + UptimeRobot) — 2026-09-13. Auth approach explicitly left open. See `DECISIONS.md`.
